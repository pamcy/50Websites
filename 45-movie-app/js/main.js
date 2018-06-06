// const menu_items = document.querySelectorAll('.sidebar__item');
const list_container = document.querySelector('.main__movie-list');
const top_playing_btn = document.querySelector('#js-top-playing');
const upcoming_btn = document.querySelector('#js-upcoming');
const top_rated_btn = document.querySelector('#js-top-rated');
const heading = document.querySelector('.main__heading');
const genres_storage = {};
const now_playing_storage = [];
const upcoming_storage = [];
const top_rated_storage = [];
let credits_storage = [];
let videos_storage = [];
let reviews_storage = [];

const api = {
  key: 'ffea606c542fc11ca9059abde95f3e90',
  img_prefix: 'https://image.tmdb.org/t/p/w500',

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
};

// const key = 'ffea606c542fc11ca9059abde95f3e90';
// const now_playing_url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1`;
// const upcoming_url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`;
// const movie_details_url = `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`;
// const movie_credits_url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${key}`;
// const movie_video_url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${key}&language=en-US`;
// const movie_review_url = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${key}&language=en-US&page=1`;


const movie = {
  fetchGenre(url) {
    return fetch(url)
      .then(response => response.json())
      .then((data) => {
        for (const item of data.genres) {
          genres_storage[item.id] = item.name;
          // console.log(genres_storage);
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
        <li class="main__movie-item">
          <a href="#" class="main__movie-item-link">
            <div class="main__movie-top">
              <img src="${api.img_prefix}${item.poster_path}" alt="${item.original_title}" class="main__movie-poster">
              <span class="main__movie-votes">${item.vote_average}</span>
            </div>
            <div class="main__movie-bottom">
              <h3 class="main__movie-name">${item.original_title}</h3>
              <h4 class="main__movie-category">${item.genre_ids.map(id => movie.displayGenres(id)).join(', ')}</h4>
            </div>
          </a>
        </li>
        `;
      })
      .join('');

    list_container.innerHTML = list_content;
    heading.textContent = title || 'Now Playing';
  },
};


function fetchCredits() {
  const movie_id = this.dataset.id;
  const movie_credits_url = `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${key}`;

  fetch(movie_credits_url)
    .then(response => response.json())
    .then(data => {
      for (const item of credits_storage) {
        if (item.id == data.id) {
          return;
        }

        credits_storage.push(data);
        // console.log(`item_id: ${item.id}, data_id: ${data.id}`);
      }
    });
}

function displayCredits() {
  // console.log(this);
  const movie_id = this.dataset.id;

  credits_storage.forEach(item => {
    if (item.id != movie_id) {
      return;
    }

    const display_numbers = 10;
    const casts = item.cast.slice(0, display_numbers);
    const casts_content = casts
      .map(cast => {
        return `
                <img src="${img_prefix}/w200/${
          cast.profile_path
        }" style="width: 50px">
                <p>${cast.name}</p>
            `;
      })
      .join("");

    // console.log(casts);

    document.querySelector(".modal__content").innerHTML = casts_content;
  });
}

function fetchVideos() {
  const movie_id = this.dataset.id;
  const movie_video_url = `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${key}&language=en-US`;

  fetch(movie_video_url)
    .then(response => response.json())
    .then(data => {
      for (const item of videos_storage) {
        if (item.id == data.id) {
          return;
        }
      }
      videos_storage.push(data);
    });
}

function displayVideos() {
  const movie_id = this.dataset.id;

  videos_storage.forEach(item => {
    if (item.id != movie_id) {
      return;
    }

    const youtube_id = item.results[0].key;
    const youtube_video = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${youtube_id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;

    document.querySelector(".movie-info__videos").innerHTML = youtube_video;

    // console.log(videos_storage);
  });
}

function fetchReviews() {
  const movie_id = this.dataset.id;
  const movie_review_url = `https://api.themoviedb.org/3/movie/${movie_id}/reviews?api_key=${key}&language=en-US&page=1`;

  fetch(movie_review_url)
    .then(response => response.json())
    .then(data => {
      for (const item of reviews_storage) {
        if (item.id == data.id) {
          return;
        }
      }
      reviews_storage.push(data);
    });
}

function displayReviews() {
  const movie_id = this.dataset.id;

  reviews_storage.forEach(item => {
    if (item.id != movie_id) {
      return;
    }

    const display_numbers = 5;
    const reviews = item.results.slice(0, display_numbers);
    let reviews_content;

    if (reviews.length <= 0) {
      // console.log('no comment');
      reviews_content = `No comments yet.`;
    } else {
      reviews_content = reviews
        .map(review => {
          return `
                    <a href="${review.url}"><h3>${review.author}</h3></a>
                    <p>${review.content}</p>
                `;
        })
        .join("");
    }

    document.querySelector(".modal__reviews").innerHTML = reviews_content;

    // console.log(reviews_storage);
  });
}

async function init() {
  await movie.fetchGenre(api.getGenreUrl());

  await movie.fetchLatestMovieData(api.getNowPlayingUrl(), now_playing_storage);
  // await movie.displayLatestMovieLists(now_playing_storage);

  await movie.fetchLatestMovieData(api.getUpComingUrl(), upcoming_storage);
  await movie.displayLatestMovieLists(upcoming_storage);

  await movie.fetchLatestMovieData(api.getTopRatedUrl(), top_rated_storage);
  // await movie.displayLatestMovieLists(top_rated_storage);

  box_items_container.querySelectorAll(".movie-list__item").forEach(item => {
    item.addEventListener("mouseenter", fetchCredits);
  });

  box_items_container.querySelectorAll(".movie-list__item").forEach(item => {
    item.addEventListener("mouseenter", fetchVideos);
  });

  box_items_container.querySelectorAll(".movie-list__item").forEach(item => {
    item.addEventListener("mouseenter", fetchReviews);
  });

  box_items_container.querySelectorAll(".movie-list__item").forEach(item => {
    item.addEventListener("click", displayCredits);
  });

  box_items_container.querySelectorAll(".movie-list__item").forEach(item => {
    item.addEventListener("click", displayVideos);
  });

  box_items_container.querySelectorAll(".movie-list__item").forEach(item => {
    item.addEventListener("click", displayReviews);
  });
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
