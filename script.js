// script.js
// const API_KEY = '9f2e12cbe9a18cbe4f36bedcb199814b';
const API_KEY = '9f2e12cbe9a18cbe4f36bedcb199814b';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/original';
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?query=Jack+Reacher';


// DOM Elements
const featured = document.querySelector('#featured');
const featuredTitle = document.querySelector('#featured-title');
const featuredDescription = document.querySelector('#featured-description');
const trendingContainer = document.querySelector('.trending-movies');
const actionContainer = document.querySelector('.action-movies');
const romanceContainer = document.querySelector('.romance');
const search = document.querySelector('.search-bar');
const input = document.getElementById('searchInput');
const resultsDiv = document.getElementById('results');
const movies = document.querySelector('.movies')


 document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navbar = document.querySelector('.navbar');

  hamburger.addEventListener('click', () => {
    navbar.classList.toggle('show');
  });
});

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Search movies with debounce
const searchMovies = debounce((query) => {
  if (query.length < 2) {
    resultsDiv.innerHTML = '';
    resultsDiv.style.display = 'none';
    return;
  }

  fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`)
    .then(res => res.json())
    .then(data => {
      const movies = data.results;
      resultsDiv.innerHTML = movies
        .map(movie => `
          <a href="movie.html?id=${movie.id}" class="search-result-item">
            <img src="${IMG_BASE_URL + (movie.poster_path || '/t/p/w92/no-poster.jpg')}" alt="${movie.title}" loading="lazy"/>
            
            <div>
              <p>${movie.title}</p>
              <span>(${movie.release_date?.slice(0, 4) || 'N/A'})</span>
            </div>
          </a>
        `)
        .join('');
      resultsDiv.style.display = movies.length ? 'block' : 'none'
    })
    .catch(err => {
      console.error(err);
      resultsDiv.innerHTML = '<p class="error">Failed to fetch movies 🥲</p>';
      resultsDiv.style.display = 'block';
    });
}, 300);

// Event listener for search input
input.addEventListener('input', (e) => {
  const query = e.target.value.trim();
  searchMovies(query);
});

// Clear results when clicking outside
document.addEventListener('click', (e) => {
  if (!search.contains(e.target) && !resultsDiv.contains(e.target)) {
    resultsDiv.innerHTML = '';
    resultsDiv.style.display = 'none';
  }
});

// Fetch Trending Movies
function getTrendingMovies() {
  fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      const movies = data.results;

      if (movies.length > 0) {
        displayFeatured(movies[0]);             // Featured = 1st trending movie
        displayMovies(movies.slice(1, 17), trendingContainer); // Next 5 = trending
      }
    })
    .catch(err => console.error('Error fetching trending:', err));
}

// Fetch Action Movies
function getActionMovies() {
  fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`)
    .then(res => res.json())
    .then(data => {
      displayMovies(data.results.slice(0, 16), actionContainer);
    })
    .catch(err => console.error('Error fetching action movies:', err));
}

// Fetch Romance Movies
function getRomanceMovies() {
  fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10749, 35`)
    .then(res => res.json())
    .then(data => {
      displayMovies(data.results.slice(0, 16), romanceContainer);
    })
    .catch(err => console.error('Error fetching romance movies:', err));
}
// Render the Featured Movie
// let currentFeaturedMovie = null;

// function displayFeatured(movie) {
//   featuredTitle.textContent = movie.title;
//   featuredDescription.textContent = movie.overview;

//   featured.style.backgroundImage = `url(${IMG_BASE_URL + movie.backdrop_path})`;
//   featured.style.backgroundSize = 'cover';
//   featured.style.backgroundPosition = 'center';
//   featured.style.backgroundRepeat = 'no-repeat';

  
// }
function displayFeatured(movie) {
  currentFeaturedMovie = movie;

  featuredTitle.textContent = movie.title;
  featuredDescription.textContent = movie.overview;

  featured.style.backgroundImage = `url(${IMG_BASE_URL + movie.backdrop_path})`;
  featured.style.backgroundSize = 'cover';
  featured.style.backgroundPosition = 'center';
  featured.style.backgroundRepeat = 'no-repeat';

  const featuredBtn = document.getElementById('add-to-watchlist-featured');
  if (featuredBtn) {
    featuredBtn.onclick = () => {
      addToWatchlist(currentFeaturedMovie);
      alert(`${currentFeaturedMovie.title} added to your watchlist! 🎉`);
    };
  } else {
    console.warn('❌ featuredBtn not found. Make sure the ID is correct.');
  }
}



// display view all


// Render search items
function searchBar() {
  fetch(`${SEARCH_URL}`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZjJlMTJjYmU5YTE4Y2JlNGYzNmJlZGNiMTk5ODE0YiIsIm5iZiI6MTc1MTA2NDQ2NS41MDU5OTk4LCJzdWIiOiI2ODVmMWY5MWNjYWU2N2EwNjQxNTVkYmUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Cigi1xN0-FKvyYoU0JlElHFleJ4CE90LZNK3DLx-qqc',

    }

  
  }
  )
}

// Reusable function to render movie cards
// function displayMovies(movies, container) {
//   container.innerHTML = '';

//   movies.forEach(movie => {
//     const movieCard = `
//       <div class="movie-card">
//         <div class="image-wrapper">
//           <img src="${IMG_BASE_URL + movie.poster_path}" alt="${movie.title}" />
//         </div>
//         <div class="info">
//           <h3>${movie.title}</h3>
//           <h5>${movie.release_date?.slice(0, 8)}</h5>
//         </div>
//       </div>
//     `;
//     container.innerHTML += movieCard;
//   });
// }
// 
function displayMovies(movies, container) {
  container.innerHTML = '';
  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');
    movieCard.innerHTML = `
      <a href="movie.html?id=${movie.id}">
        <div class="image-wrapper">
          <img src="${movie.poster_path ? IMG_BASE_URL + movie.poster_path : 'no-poster.jpg'}" alt="${movie.title} poster" loading="lazy" />
          <i class="fa-solid fa-plus plus" data-id="${movie.id}"></i>
        </div>
        <div class="info">
          <h3>${movie.title}</h3>
          <h5>${movie.release_date?.slice(0, 8) || 'N/A'}</h5>
        </div>
      </a>
    `;
    container.appendChild(movieCard);
    const plusIcon = movieCard.querySelector('.plus');
    plusIcon.addEventListener('click', (e) => {
      e.preventDefault();
      addToWatchlist(movie);
      alert(`${movie.title} added to your watchlist! 🎉`);
    });
  });
}

function addToWatchlist(movie) {
  let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
  if (!watchlist.some(m => m.id === movie.id)) {
    watchlist.push({ id: movie.id, title: movie.title, poster_path: movie.poster_path });
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }
}


// Load All Sections
getTrendingMovies();
getActionMovies();
getRomanceMovies();
