// script.js
// const API_KEY = '9f2e12cbe9a18cbe4f36bedcb199814b';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '9f2e12cbe9a18cbe4f36bedcb199814b';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Trending Section
function getTrendingMovies() {
  fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      displayMovies(data.results.slice(0, 5), '.trending-movies');
    })
    .catch(err => console.error('Error fetching trending:', err));
}

// Action Section
function getActionMovies() {
  fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`)
    .then(res => res.json())
    .then(data => {
      displayMovies(data.results.slice(0, 5), '.action-movies');
    })
    .catch(err => console.error('Error fetching action:', err));
}

// Shared display function
function displayMovies(movies, containerSelector) {
  const container = document.querySelector(containerSelector);
  container.innerHTML = '';

  movies.forEach(movie => {
    const movieCard = `
      <div class="movie-card">
        <div class="image-wrapper">
          <img src="${IMG_BASE_URL + movie.poster_path}" alt="${movie.title}" />
        </div>
        <div class="info">
          <h3>${movie.title}</h3>
          <h5>${movie.release_date?.slice(0, 4)}</h5>
        </div>
      </div>
    `;
    container.innerHTML += movieCard;
  });
}

// 🔥 Load both on page
getTrendingMovies();
getActionMovies();
