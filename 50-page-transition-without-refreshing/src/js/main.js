const transition = (() => {
  //
  // Variables
  //
  const menu_links = document.querySelectorAll('.menu__link');
  const overlay = document.querySelector('.overlay');

  let inClick = false;
  let animationTimer;
  //
  // Methods
  //
  function preloadHeroImg() {
    const hero_imgs = document.querySelectorAll('.preload__img');

    hero_imgs.forEach((hero_img) => {
      const hero_url = hero_img.dataset.src;
      const new_img = new Image();
      new_img.src = hero_url;
    });
  }

  function addTransition() {
    overlay.classList.remove('shrink');
    overlay.classList.add('grow');
    // hero_body.classList.remove('is-showing');
  }

  function removeTransition() {
    const hero_body = document.querySelector('.hero__body');

    overlay.classList.remove('grow');
    overlay.classList.add('shrink');
    hero_body.classList.add('is-showing');
  }

  function handleAnimationEnd() {
    removeTransition();
    overlay.removeEventListener('animationend', handleAnimationEnd);
  }

  function fetchPageURL(url) {
    return fetch(url)
      .then(response => response.text());
  }

  function loadContent(url) {
    inClick = true;
    const main_section = document.querySelector('.main-content');
    const old_hero_content = document.querySelector('.hero');

    fetchPageURL(url)
      .then((data) => {
        // Pass the data in a new <div>
        const div = document.createElement('div');
        div.innerHTML = data;

        // Append the new <div> content
        const new_hero_content = div.querySelector('.hero');
        main_section.appendChild(new_hero_content);

        // Remove the old content
        old_hero_content.parentNode.removeChild(old_hero_content);

        // Change the window location
        document.title = div.getElementsByTagName('title')[0].textContent;
        // window.history.pushState(url, title, url);

        console.log(window.history);
        inClick = false;
      });

      animationTimer = setInterval(() => {
        if (inClick === false) {
          handleAnimationEnd();
          clearInterval(animationTimer);
        }
      }, 1000);
  }

  function transitionController(url) {
    addTransition();
    loadContent(url);
    // overlay.addEventListener('animationend', handleAnimationEnd);
  }


  //
  // Inits & Event Listeners
  //
  preloadHeroImg();

  menu_links.forEach(link => link.addEventListener('click', (e) => {
    if (inClick === true) {
      return;
    }
    e.preventDefault();

    const url = e.currentTarget.href;

    transitionController(url);

    window.history.pushState(url, null, url);
  }));

  window.addEventListener('popstate', function (e) {
    transitionController(window.location.href);
  });


  document.querySelector('.hero__body').classList.add('is-showing');
})();
