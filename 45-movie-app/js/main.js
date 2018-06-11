const top_playing_btn = document.querySelector('#js-top-playing');
const upcoming_btn = document.querySelector('#js-upcoming');
const top_rated_btn = document.querySelector('#js-top-rated');
const heading = document.querySelector('.main__heading');
const list_container = document.querySelector('.main__movie-list');
const modal = document.querySelector('.overlay');
const modal_close_btn = document.querySelector('.overlay__close-icon');
const search_field = document.querySelector('#js-search');
const genres_storage = {};
const now_playing_storage = [];
const upcoming_storage = [];
const top_rated_storage = [];
const details_storage = [];
const casts_storage = [];
const videos_storage = [];
const search_storage = [];
let search_timeout = null;

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
    return `https://api.themoviedb.org/3/movie/upcoming?api_key=${this.key}&language=en-US&region=us&page=1`;
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
  getSearchUrl(value) {
    return `https://api.themoviedb.org/3/search/movie?api_key=${this.key}&query=${value}&page=1`;
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
    list_container.innerHTML = '';

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
        const exist = details_storage.findIndex((current) => {
          return current.id == id;
        });

        if (exist < 0) {
          details_storage.push(data);
        }

        return details_storage;
      });
  },
  fetchCastsData(id) {
    return fetch(api.getCastsUrl(id))
      .then(response => response.json())
      .then((data) => {
        const exist = casts_storage.findIndex((current) => {
          return current.id == id;
        });

        if (exist < 0) {
          casts_storage.push(data);
        }

        return casts_storage;
      });
  },
  fetchVideosData(id) {
    return fetch(api.getVideoUrl(id))
      .then(response => response.json())
      .then((data) => {
        const exist = videos_storage.findIndex((current) => {
          return current.id == id;
        });

        if (exist < 0) {
          videos_storage.push(data);
        }

        return videos_storage;
      });
  },
  renderModalContent(e) {
    const current_movie = e.target.closest('.main__movie-item');

    if (!current_movie) {
      return;
    }

    const movie_id = current_movie.dataset.id;
    const details_data = movie.fetchMovieDetails(movie_id);
    const casts_data = movie.fetchCastsData(movie_id);
    const videos_data = movie.fetchVideosData(movie_id);

    const backdrop = document.querySelector('.overlay__backdrop');
    const vote = document.querySelector('.overlay__votes');
    const poster = document.querySelector('.overlay__poster');
    const name = document.querySelector('.overlay__info-heading');
    const runtime = document.querySelector('.overlay__info-runtime');
    const category = document.querySelector('.overlay__info-category');
    const overview = document.querySelector('.overlay__info-overview');
    const casts_container = document.querySelector('.overlay__cast-list');
    const video_container = document.querySelector('.overlay__video-wrapper');

    details_data.then((data) => {
      const match_data = data.filter(item => item.id == movie_id);

      backdrop.style.backgroundImage = `url('${api.img_prefix}1280/${match_data[0].backdrop_path}')`;

      poster.src = `${api.img_prefix}300/${match_data[0].poster_path}`;

      vote.textContent = `${match_data[0].vote_average}`;

      name.textContent = match_data[0].original_title;

      runtime.textContent = `${match_data[0].runtime}mins`;

      category.textContent = current_movie.querySelector('.main__movie-category').textContent;

      overview.textContent = `${match_data[0].overview}`;
    });

    casts_data.then((data) => {
      const casts_limit = 6;
      const match_data = data.filter(item => item.id == movie_id);
      const main_actor = match_data[0].cast.slice(0, casts_limit);

      const casts_content = main_actor.map((actor) => {
        return `
          <li class="overlay__cast-item">
            <div class="overlay__cast-img-container">
              <img src="${api.img_prefix}200${actor.profile_path}" alt="${actor.name}'s photo" class="overlay__cast-img">
            </div>
            <span class="overlay__cast-name">${actor.name}</span>
          </li>
        `;
      }).join('');

      casts_container.innerHTML = casts_content;
    });

    videos_data.then((data) => {

      const match_data = data.filter(item => item.id == movie_id);

      const youtube_key = match_data[0].results[0].key;
      const video_content = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${youtube_key}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;

      video_container.innerHTML = video_content;
    });
  },
  fetchSearchData() {
    const search_dalay_time = 800;
    const search_value = this.value;

    clearTimeout(search_timeout);

    search_timeout = setTimeout(() => {
      return fetch(api.getSearchUrl(search_value))
        .then(response => response.json())
        .then((data) => {
          const exist = search_storage.findIndex((current) => {
            return current.value == search_value;
          });

          if (exist < 0) {
            search_storage.push({ value: search_value, result: data.results });
          }
        })
        .then(() => movie.displaySearchLists(search_value));
    }, search_dalay_time);
  },
  displaySearchLists(keyword) {
    list_container.innerHTML = '';

    const match_data = search_storage.filter((item) => {
      return item.value == keyword;
    });

    // console.log(match_data);

    const search_content = match_data[0].result.map((item) => {
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
    }).join('');

    heading.textContent = `Search results for ${keyword}`;
    list_container.innerHTML = search_content;
    search_field.value = '';
  },
  openModal(e) {
    if (e.target.closest('.main__movie-item')) {
      modal.classList.add('is-open');
    }
  },
  closeModal() {
    modal.classList.remove('is-open');
  },
  toggleMenuStyle(e) {
    const current = e.currentTarget;

    current.parentElement.querySelectorAll('.sidebar__item').forEach((menu) => {
      menu.classList.remove('is-active');
    });
    current.classList.add('is-active');
  },
};

async function init() {
  await movie.fetchGenre(api.getGenreUrl());

  await movie.fetchLatestMovieData(api.getNowPlayingUrl(), now_playing_storage);
  await movie.displayLatestMovieLists(now_playing_storage);

  await movie.fetchLatestMovieData(api.getUpComingUrl(), upcoming_storage);

  await movie.fetchLatestMovieData(api.getTopRatedUrl(), top_rated_storage);
}

init();

top_playing_btn.addEventListener('click', (e) => {
  movie.toggleMenuStyle(e);
  movie.displayLatestMovieLists(now_playing_storage, e.currentTarget.textContent);
});

upcoming_btn.addEventListener('click', (e) => {
  movie.toggleMenuStyle(e);
  movie.displayLatestMovieLists(upcoming_storage, e.currentTarget.textContent);
});

top_rated_btn.addEventListener('click', (e) => {
  movie.toggleMenuStyle(e);
  movie.displayLatestMovieLists(top_rated_storage, e.currentTarget.textContent);
});

list_container.addEventListener('mouseover', (e) => {
  movie.renderModalContent(e);
});

list_container.addEventListener('click', (e) => {
  movie.openModal(e);
});

modal_close_btn.addEventListener('click', movie.closeModal);

search_field.addEventListener('keyup', movie.fetchSearchData);
search_field.addEventListener('keydown', movie.fetchSearchData);
search_field.addEventListener('change', movie.fetchSearchData);
