const top_playing_btn = document.querySelector('#js-top-playing');
const upcoming_btn = document.querySelector('#js-upcoming');
const top_rated_btn = document.querySelector('#js-top-rated');
const heading = document.querySelector('.main__heading');
const list_container = document.querySelector('.main__movie-list');
const modal = document.querySelector('.overlay');
const modal_close_btn = document.querySelector('.overlay__close-icon');
const genres_storage = {};
const now_playing_storage = [];
const upcoming_storage = [];
const top_rated_storage = [];
let details_storage;
let casts_storage;
let videos_storage;

const api = {
  key: 'ffea606c542fc11ca9059abde95f3e90',
  img_prefix: 'https://image.tmdb.org/t/p/w',

  getGenreUrl() {
    return `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.key}&language=en-US`;
  },
  getNowPlayingUrl() {
    return `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.key}&language=en-US&page=1`;
  },
  getUpComingUrl() {
    return `https://api.themoviedb.org/3/movie/upcoming?api_key=${this.key}&language=en-US&page=1`;
  },
  getTopRatedUrl() {
    return `https://api.themoviedb.org/3/movie/top_rated?api_key=${this.key}&language=en-US&page=1`;
  },
  getMovieDetailsUrl(id) {
    return `https://api.themoviedb.org/3/movie/${id}?api_key=${this.key}`;
  },
  getCastsUrl(id) {
    return `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${this.key}`;
  },
  getVideoUrl(id) {
    return `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${this.key}`;
  },
};

const movie = {
  fetchGenre(url) {
    return fetch(url)
      .then(response => response.json())
      .then((data) => {
        for (const item of data.genres) {
          genres_storage[item.id] = item.name;
        }
      });
  },
  displayGenres(genre_id) {
    return genres_storage[genre_id];
  },
  // Include Now playing, UpComing, Top rated movies
  fetchLatestMovieData(url, storage) {
    return fetch(url)
      .then(response => response.json())
      .then(data => storage.push(...data.results));
  },
  displayLatestMovieLists(storage, title) {
    const list_content = storage
      .map((item) => {
        return `
        <li class="main__movie-item" data-id="${item.id}">
          <div class="main__movie-top">
            <img src="${api.img_prefix}500${item.poster_path}" alt="${item.original_title}" class="main__movie-poster">
            <span class="main__movie-votes">${item.vote_average}</span>
          </div>
          <div class="main__movie-bottom">
            <h3 class="main__movie-name">${item.original_title}</h3>
            <h4 class="main__movie-category">${item.genre_ids.map(id => movie.displayGenres(id)).join(', ')}</h4>
          </div>
        </li>
        `;
      })
      .join('');

    list_container.innerHTML = list_content;
    heading.textContent = title || 'Now Playing';
  },
  fetchMovieDetails(id) {
    return fetch(api.getMovieDetailsUrl(id))
      .then(response => response.json())
      .then((data) => {
        details_storage = data;
      });
  },
  fetchCastsData(id) {
    return fetch(api.getCastsUrl(id))
      .then(response => response.json())
      .then((data) => {
        casts_storage = data.cast;
      });
  },
  fetchVideosData(id) {
    return fetch(api.getVideoUrl(id))
      .then(response => response.json())
      .then((data) => {
        videos_storage = data.results;
      });
  },
  writeModalContent(e) {
    const current_movie = e.target.closest('.main__movie-item');

    if (!current_movie) {
      return;
    }

    const movie_id = current_movie.dataset.id;
    const details = movie.fetchMovieDetails(movie_id);
    const casts = movie.fetchCastsData(movie_id);
    const videos = movie.fetchVideosData(movie_id);

    const backdrop = document.querySelector('.overlay__backdrop');
    const vote = document.querySelector('.overlay__votes');
    const poster = document.querySelector('.overlay__poster');
    const name = document.querySelector('.overlay__info-heading');
    const runtime = document.querySelector('.overlay__info-runtime');
    const category = document.querySelector('.overlay__info-category');
    const overview = document.querySelector('.overlay__info-overview');
    const casts_container = document.querySelector('.overlay__cast-list');
    const video_container = document.querySelector('.overlay__video-wrapper');

    details.then(() => {
      backdrop.style.backgroundImage = `url('${api.img_prefix}1280/${details_storage.backdrop_path}')`;

      poster.src = `${api.img_prefix}300/${details_storage.poster_path}`;

      vote.textContent = `${details_storage.vote_average}`;

      name.textContent = details_storage.original_title;

      runtime.textContent = `${details_storage.runtime}mins`;

      category.textContent = current_movie.querySelector('.main__movie-category').textContent;

      overview.textContent = `${details_storage.overview}`;
    });

    casts.then(() => {
      const casts_limit = 6;
      const all_casts = casts_storage.splice(0, casts_limit);

      const casts_content = all_casts.map((cast) => {
        return `
          <li class="overlay__cast-item">
            <div class="overlay__cast-img-container">
              <img src="${api.img_prefix}200${cast.profile_path}" alt="${cast.name}'s photo" class="overlay__cast-img">
            </div>
            <span class="overlay__cast-name">${cast.name}</span>
          </li>
        `;
      }).join('');

      casts_container.innerHTML = casts_content;
    });

    videos.then(() => {
      const youtube_key = videos_storage[0].key;
      const video_content = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${youtube_key}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;

      video_container.innerHTML = video_content;
    });
  },
  openModal(e) {
    if (e.target.closest('.main__movie-item')) {
      modal.classList.add('is-open');
    }
  },
  closeModal() {
    modal.classList.remove('is-open');
  },
};

async function init() {
  await movie.fetchGenre(api.getGenreUrl());

  await movie.fetchLatestMovieData(api.getNowPlayingUrl(), now_playing_storage);
  // await movie.displayLatestMovieLists(now_playing_storage);

  await movie.fetchLatestMovieData(api.getUpComingUrl(), upcoming_storage);
  await movie.displayLatestMovieLists(upcoming_storage);

  await movie.fetchLatestMovieData(api.getTopRatedUrl(), top_rated_storage);
  // await movie.displayLatestMovieLists(top_rated_storage);
}

init();

function toggleMenuStyle(e) {
  const current = e.currentTarget;

  current.parentElement.querySelectorAll('.sidebar__item').forEach((menu) => {
    menu.classList.remove('is-active');
  });
  current.classList.add('is-active');
}

top_playing_btn.addEventListener('click', (e) => {
  toggleMenuStyle(e);
  movie.displayLatestMovieLists(now_playing_storage, e.currentTarget.textContent);
});

upcoming_btn.addEventListener('click', (e) => {
  toggleMenuStyle(e);
  movie.displayLatestMovieLists(upcoming_storage, e.currentTarget.textContent);
});

top_rated_btn.addEventListener('click', (e) => {
  toggleMenuStyle(e);
  movie.displayLatestMovieLists(top_rated_storage, e.currentTarget.textContent);
});

list_container.addEventListener('mouseover', (e) => {
  movie.writeModalContent(e);
});

list_container.addEventListener('click', (e) => {
  movie.openModal(e);
});

modal_close_btn.addEventListener('click', movie.closeModal);

// menu_items.forEach((item) => {
//   item.addEventListener('click', (e) => {

//     // const now_playing_storage = [];
//     // const upcoming_storage = [];
//     // const top_rated_storage = [];
//     console.log(e.currentTarget.dataset.item);

//     const menu = {
//       menu1: 'now_playing_storage',
//       menu2: 'upcoming_storage',
//       menu3: 'top_rated_storage',
//     };

//     if (e.currentTarget.dataset.item == men)

//     movie.displayLatestMovieLists(top_rated_storage, e.target.textContent);
//     // console.log(e.target);
//   });
// });
