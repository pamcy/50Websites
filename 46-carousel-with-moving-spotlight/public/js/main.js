const scooter = (() => {

  //
  // Variables
  //
  const settings_list = document.querySelector('.settings__list');
  const carousel = document.querySelector('.feature-carousel');
  const add_slide_btn = document.querySelector('.settings__add-btn');
  const submit_btn = document.querySelector('.settings__submit-btn');
  const settings_btn = document.querySelector('.settings__edit-btn');
  let storage = []; // Save setting's value
  let panel_is_open = false;


  //
  // Methods
  //
  const calculateSettingsListNumber = () => {
    const settings_items = settings_list.querySelectorAll('.js-item');
    return settings_items.length;
  }

  const addSettingsItem = () => {
    const list_number = calculateSettingsListNumber();
    const li = document.createElement('li');
    const template = `
        <span class="settings__column js-no">#${list_number + 1}</span>
        <span class="settings__column">
           <input type="number" class="settings__number js-input-x" min="0" max="100" value=50>
        </span>
        <span class="settings__column">
           <input type="number" class="settings__number js-input-y" min="0" max="100" value=50>
        </span>
        <span class="settings__column">
           <select name="zoom" id="select-zoom" class="settings__select js-select">
              <option value="100">1</option>
              <option value="150">1.5</option>
              <option value="200" selected>2</option>
              <option value="250">2.5</option>
              <option value="300">3</option>
           </select>
        </span>
        <span class="settings__column">
           <input type="text" class="settings__text js-input-title" value="" size="30">
        </span>
        <span class="settings__column">
           <input type="text" class="settings__text js-input-description" size="30" maxlength="100" value="">
        </span>
        <span class="settings__column js-delete-btn">
           <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/829617/delete_icon.png" alt="" class="settings__delete-icon js-delete-btn">
        </span>`;

    li.classList.add('settings__item', 'js-item');
    li.id = `setting-${list_number}`;
    li.innerHTML = template;
    settings_list.appendChild(li);
  };

  const saveSettingsValue = () => {
    storage = []; // Remember to clear all the values

    const lists = document.querySelectorAll('.js-item');

    lists.forEach((list, index) => {
      const x_value = list.querySelector('.js-input-x').value;
      const y_value = list.querySelector('.js-input-y').value;
      const select_value = list.querySelector('.js-select').value;
      const title_value = list.querySelector('.js-input-title').value;
      const description_value = list.querySelector('.js-input-description').value;
      const data = {
        x: x_value,
        y: y_value,
        zoom: select_value,
        title: title_value,
        description: description_value,
      }

      storage[index] = data;
    });

    displayLoadingEffect();
  };

  const displayLoadingEffect = () => {
    document.querySelector('.feature-wrap').classList.add('is-loading');

    renderCarouselData(true);
    setTimeout(removeLoadingEffect, 1000);
    toggleSettings();
  };

  const removeLoadingEffect = () => {
    document.querySelector('.feature-wrap').classList.remove('is-loading');
  };

  const clearCarousel = (slickObj) => {
    let count = slickObj.slick("getSlick").slideCount;

    // Remove all slides
    while (count > 0) {
      slickObj.slick('slickRemove', 0);
      count--;
    }
  };

  const renderCarouselData = (isClear = false) => {
    const carousel_list = $('.feature-carousel__list');

    if (isClear) {
      clearCarousel(carousel_list);
    }

    let carousel_content = storage.map((data, index) => {
      return `
           <div class="feature-carousel__item">
              <p class="feature-carousel__label">
                 <span class="feature-carousel__label-text js-item-number">${index + 1} / ${storage.length} </span>
                 <span class="feature-carousel__label-line"></span>
                 <span class="feature-carousel__label-text">${data.title}</span>
              </p>
              <p class="feature-carousel__description">${data.description}</p>
           </div>`;
    }).join('');

    carousel_list.slick('slickAdd', carousel_content);

    moveZoomPosition();
  };

  const moveZoomPosition = () => {
    const current_index = document.querySelector('.slick-active').dataset.slickIndex;
    const img = document.querySelector('.feature-zoom__img');

    img.style.backgroundPosition = `${storage[current_index].x}% ${storage[current_index].y}%`;
    img.style.backgroundSize = `${storage[current_index].zoom}%`;
  };

  const deleteSettingsItem = (e) => {
    const target = e.target;
    if (!target.classList.contains('js-delete-btn')) return;

    const target_item = target.closest('.js-item');
    const target_item_id = target_item.id.split('-')[1];
    const settings_list = target_item.parentElement;

    settings_list.removeChild(target_item);

    updateListNumberAfterDelete();
  };

  const updateListNumberAfterDelete = () => {
    const no_columns = document.querySelectorAll('.js-no');

    no_columns.forEach((column, index) => {
      column.innerHTML = `#${index + 1}`;
    });
  };

  const checkInputNumberValues = (e) => {
    const target = e.target;
    const input_numbers = target.classList.contains('settings__number');

    if (!input_numbers) return;

    let input_value = target.value;

    if (input_value < 0 || input_value > 100) {
      alert('The value must be between 1 ~ 100');
      e.target.value = 1;
    };
  };

  const updatePanelMoveUpDistance = (SettingsObj) => {
    const panel = SettingsObj.querySelector('.settings__panel');
    const panel_height = panel.clientHeight;

    return panel_height;
  };

  const toggleSettings = () => {
    const settings = document.querySelector('.settings');
    const distance = updatePanelMoveUpDistance(settings);

    panel_is_open = !panel_is_open;

    if (panel_is_open) {
      settings.style.transform = `translateY(${0})`;
    } else {
      settings.style.transform = `translateY(${-distance}px)`;
    }
  };

  const callCarousel = () => {
    const carousel_list = $('.feature-carousel__list');
    const slick_options = {
      slidesToShow: 1,
      infinite: false,
      prevArrow: '<button class="feature-carousel__btn feature-carousel__btn--prev js-trigger-btn"></button>',
      nextArrow: '<button class="feature-carousel__btn feature-carousel__btn--next js-trigger-btn"></button>',
    }

    carousel_list.slick(slick_options);
  };

  const setDefaultCarouselContent = () => {
    storage = [
      { x: "50", y: "50", zoom: "100", title: "The Evolution Of The Legendary", description: "It's combine fresh style and sporty personality with cutting-edge technology." },
      { x: "65", y: "5", zoom: "300", title: "Genuine Parts Are Better", description: "Simple and easy to use mechanical antitheft system which locks the handlebar to the vehicle with a fastener system fixed to the body." },
      { x: "10", y: "85", zoom: "250", title: "Highest Performing Engine", description: "With its single engine capacity, is definitely the long range touring." },
      { x: "100", y: "100", zoom: "200", title: "Safty First", description: "The sensor system installed on the front wheel is able to prevent locking and guarantee stability & effective braking." },
    ];

    renderCarouselData();
  };

  const is_desktop = () => {
    const minimum_width = 1024;
    return Math.min(document.documentElement.clientWidth, window.innerWidth, screen.width) > minimum_width;
  };

  const setZoomBoxWidth = () => {
    const zoom_box = document.querySelector('.feature-zoom');
    const percentage = 0.7;

    if (is_desktop()) {
      zoom_box.style.width = `${window.innerWidth * percentage}px`;
      zoom_box.style.height = `${window.innerHeight}px`;
    }
    else {
      zoom_box.style.width = '';
      zoom_box.style.height = '';
    }
  };

  const init = () => {
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
  carousel.addEventListener('click', (e) => {
    const has_nav_btns = e.target.classList.contains('js-trigger-btn');
    if (!has_nav_btns) return;

    moveZoomPosition();
  });
  settings_list.addEventListener('keyup', checkInputNumberValues);
  settings_btn.addEventListener('click', toggleSettings);

  window.addEventListener('resize', setZoomBoxWidth);
})();
