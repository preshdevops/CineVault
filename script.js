// script.js
// const API_KEY = '9f2e12cbe9a18cbe4f36bedcb199814b';
const API_KEY = '9f2e12cbe9a18cbe4f36bedcb199814b'; // Replace this with your TMDB API key
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/original';

// DOM Elements
const featured = document.querySelector('#featured');
const featuredTitle = document.querySelector('#featured-title');
const featuredDescription = document.querySelector('#featured-description');
const trendingContainer = document.querySelector('.trending-movies');

// Fetch trending movies from TMDB
function getTrendingMovies() {
  fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      const movies = data.results;

      if (movies.length > 0) {
        displayFeatured(movies[0]);             // Show the first as featured
        displayTrending(movies.slice(1, 6));    // Next 5 as trending
      }
    })
    .catch(err => console.error('Error fetching movies:', err));
}

// Display the featured movie in the hero/banner
function displayFeatured(movie) {
  featuredTitle.textContent = movie.title;
  featuredDescription.textContent = movie.overview;

  featured.style.backgroundImage = `url(${IMG_BASE_URL + movie.backdrop_path})`;
  featured.style.backgroundSize = 'cover';
  featured.style.backgroundPosition = 'center';
  featured.style.backgroundRepeat = 'no-repeat';
}

// Display the 5 trending movie cards
function displayTrending(movies) {
  trendingContainer.innerHTML = '';

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
    trendingContainer.innerHTML += movieCard;
  });
}

// Kick things off
getTrendingMovies();
