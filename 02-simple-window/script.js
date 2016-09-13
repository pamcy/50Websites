$( document ).ready(function() {
        $('.trigger').on('click', function() {
           $('.modal-wrapper').toggleClass('open');
          $('.page-wrapper').toggleClass('blur');
           return false;
        });

  function chargebattery() {
    var icon;
    icon = document.getElementById("battery");
    icon.className ='fa fa-battery-empty';

    setTimeout(function () {
      icon.className ='fa fa-battery-quarter';
    }, 1000);
    setTimeout(function () {
      icon.className ='fa fa-battery-half';
    }, 2000);
    setTimeout(function () {
      icon.className ='fa fa-battery-three-quarters';
    }, 3000);
    setTimeout(function () {
      icon.className ='fa fa-battery-full';
     }, 4000);
  }
  chargebattery();
  setInterval(chargebattery, 5000);
});