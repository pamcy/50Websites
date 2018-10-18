'use strict';

var scooter = function () {

   //
   // Variables
   //
   var settings_list = document.querySelector('.settings__list');
   var carousel = document.querySelector('.feature-carousel');
   var add_slide_btn = document.querySelector('.settings__add-btn');
   var delete_slide_btns = document.querySelectorAll('.js-delete-btn');
   var submit_btn = document.querySelector('.settings__submit-btn');
   var settings_btn = document.querySelector('.settings__edit-btn');
   var input_numbers = document.querySelectorAll('input[type="number"]');
   var storage = []; // Save setting's value
   var panel_is_open = false;

   //
   // Methods
   //
   var calculateSettingsListNumber = function calculateSettingsListNumber() {
      var settings_items = settings_list.querySelectorAll('.js-item');
      return settings_items.length;
   };

   var addSettingsItem = function addSettingsItem() {
      var list_number = calculateSettingsListNumber();
      var li = document.createElement('li');
      var template = '\n        <span class="settings__column js-no">#' + (list_number + 1) + '</span>\n        <span class="settings__column">\n           <input type="number" class="settings__number js-input-x" min="0" max="100" value=50>\n        </span>\n        <span class="settings__column">\n           <input type="number" class="settings__number js-input-y" min="0" max="100" value=50>\n        </span>\n        <span class="settings__column">\n           <select name="zoom" id="select-zoom" class="settings__select js-select">\n              <option value="100">1</option>\n              <option value="150">1.5</option>\n              <option value="200" selected>2</option>\n              <option value="250">2.5</option>\n              <option value="300">3</option>\n           </select>\n        </span>\n        <span class="settings__column">\n           <input type="text" class="settings__text js-input-title" value="" size="30">\n        </span>\n        <span class="settings__column">\n           <input type="text" class="settings__text js-input-description" size="30" maxlength="100" value="">\n        </span>\n        <span class="settings__column js-delete-btn">\n           <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/829617/delete_icon.png" alt="" class="settings__delete-icon js-delete-btn">\n        </span>';

      li.classList.add('settings__item', 'js-item');
      li.id = 'setting-' + list_number;
      li.innerHTML = template;
      settings_list.appendChild(li);
   };

   var saveSettingsValue = function saveSettingsValue() {
      storage = []; // Remember to clear all the values

      var lists = document.querySelectorAll('.js-item');

      lists.forEach(function (list, index) {
         var x_value = list.querySelector('.js-input-x').value;
         var y_value = list.querySelector('.js-input-y').value;
         var select_value = list.querySelector('.js-select').value;
         var title_value = list.querySelector('.js-input-title').value;
         var description_value = list.querySelector('.js-input-description').value;
         var data = {
            x: x_value,
            y: y_value,
            zoom: select_value,
            title: title_value,
            description: description_value
         };

         storage[index] = data;
      });

      displayLoadingEffect();
   };

   var displayLoadingEffect = function displayLoadingEffect() {
      document.querySelector('.feature-wrap').classList.add('is-loading');

      renderCarouselData(isClear = true);
      setTimeout(removeLoadingEffect, 1000);
      toggleSettings();
   };

   var removeLoadingEffect = function removeLoadingEffect() {
      document.querySelector('.feature-wrap').classList.remove('is-loading');
   };

   var clearCarousel = function clearCarousel(slickObj) {
      var count = slickObj.slick("getSlick").slideCount;

      // Remove all slides
      while (count > 0) {
         slickObj.slick('slickRemove', 0);
         count--;
      }
   };

   var renderCarouselData = function renderCarouselData() {
      var isClear = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var carousel_list = $('.feature-carousel__list');

      if (isClear) {
         clearCarousel(carousel_list);
      }

      var carousel_content = storage.map(function (data, index) {
         return '\n           <div class="feature-carousel__item">\n              <p class="feature-carousel__label">\n                 <span class="feature-carousel__label-text js-item-number">' + (index + 1) + ' / ' + storage.length + ' </span>\n                 <span class="feature-carousel__label-line"></span>\n                 <span class="feature-carousel__label-text">' + data.title + '</span>\n              </p>\n              <p class="feature-carousel__description">' + data.description + '</p>\n           </div>';
      }).join('');

      carousel_list.slick('slickAdd', carousel_content);

      moveZoomPosition();
   };

   var moveZoomPosition = function moveZoomPosition() {
      var current_index = document.querySelector('.slick-active').dataset.slickIndex;
      var img = document.querySelector('.feature-zoom__img');

      img.style.backgroundPosition = storage[current_index].x + '% ' + storage[current_index].y + '%';
      img.style.backgroundSize = storage[current_index].zoom + '%';
   };

   var deleteSettingsItem = function deleteSettingsItem(e) {
      var target = e.target;
      if (!target.classList.contains('js-delete-btn')) return;

      var target_item = target.closest('.js-item');
      var target_item_id = target_item.id.split('-')[1];
      var settings_list = target_item.parentElement;

      settings_list.removeChild(target_item);

      updateListNumberAfterDelete();
   };

   var updateListNumberAfterDelete = function updateListNumberAfterDelete() {
      var no_columns = document.querySelectorAll('.js-no');

      no_columns.forEach(function (column, index) {
         column.innerHTML = '#' + (index + 1);
      });
   };

   var checkInputNumberValues = function checkInputNumberValues(e) {
      var target = e.target;
      var input_numbers = target.classList.contains('settings__number');

      if (!input_numbers) return;

      var input_value = target.value;

      if (input_value < 0 || input_value > 100) {
         alert('The value must be between 1 ~ 100');
         e.target.value = 1;
      };
   };

   var updatePanelMoveUpDistance = function updatePanelMoveUpDistance(SettingsObj) {
      var panel = SettingsObj.querySelector('.settings__panel');
      var panel_height = panel.clientHeight;

      return panel_height;
   };

   var toggleSettings = function toggleSettings() {
      var settings = document.querySelector('.settings');
      var distance = updatePanelMoveUpDistance(settings);

      panel_is_open = !panel_is_open;

      if (panel_is_open) {
         settings.style.transform = 'translateY(' + 0 + ')';
      } else {
         settings.style.transform = 'translateY(' + -distance + 'px)';
      }
   };

   var callCarousel = function callCarousel() {
      var carousel_list = $('.feature-carousel__list');
      var slick_options = {
         slidesToShow: 1,
         infinite: false,
         prevArrow: '<button class="feature-carousel__btn feature-carousel__btn--prev js-trigger-btn"></button>',
         nextArrow: '<button class="feature-carousel__btn feature-carousel__btn--next js-trigger-btn"></button>'
      };

      carousel_list.slick(slick_options);
   };

   var setDefaultCarouselContent = function setDefaultCarouselContent() {
      storage = [{ x: "50", y: "50", zoom: "100", title: "The Evolution Of The Legendary", description: "It's combine fresh style and sporty personality with cutting-edge technology." }, { x: "65", y: "5", zoom: "300", title: "Genuine Parts Are Better", description: "Simple and easy to use mechanical antitheft system which locks the handlebar to the vehicle with a fastener system fixed to the body." }, { x: "10", y: "85", zoom: "250", title: "Highest Performing Engine", description: "With its single engine capacity, is definitely the long range touring." }, { x: "100", y: "100", zoom: "200", title: "Safty First", description: "The sensor system installed on the front wheel is able to prevent locking and guarantee stability & effective braking." }];

      renderCarouselData();
   };

   var is_desktop = function is_desktop() {
      var minimum_width = 1024;
      return Math.min(document.documentElement.clientWidth, window.innerWidth, screen.width) > minimum_width;
   };

   var setZoomBoxWidth = function setZoomBoxWidth() {
      var zoom_box = document.querySelector('.feature-zoom');
      var percentage = 0.7;

      if (is_desktop()) {
         zoom_box.style.width = window.innerWidth * percentage + 'px';
         zoom_box.style.height = window.innerHeight + 'px';
      } else {
         zoom_box.style.width = '';
         zoom_box.style.height = '';
      }
   };

   var init = function init() {
      callCarousel();
      setDefaultCarouselContent();
      setZoomBoxWidth();
   };

   //
   // Inits & Event Listeners
   //
   init();

   add_slide_btn.addEventListener('click', addSettingsItem);
   settings_list.addEventListener('click', deleteSettingsItem);
   submit_btn.addEventListener('click', saveSettingsValue);
   carousel.addEventListener('click', function (e) {
      var has_nav_btns = e.target.classList.contains('js-trigger-btn');
      if (!has_nav_btns) return;

      moveZoomPosition();
   });
   settings_list.addEventListener('keyup', checkInputNumberValues);
   settings_btn.addEventListener('click', toggleSettings);

   window.addEventListener('resize', setZoomBoxWidth);
}();