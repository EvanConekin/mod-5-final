
// data    http://www.omdbapi.com/?apikey=bbf6414c&s
// posters http://img.omdbapi.com/?apikey=bbf6414c&
// ten cards: remove marvel for search API: https://www.omdbapi.com/?apikey=bbf6414c&s=marvel
const API_KEY= `bbf6414c`
const searchForm = document.querySelector(`#searchForm`);
const searchInput = document.querySelector(`#searchInput`);
const moviesGrid = document.querySelector(`#moviesGrid`);
const resultsInfo = document.querySelector(`#resultsInfo`);
const sortSelect = document.querySelector(`#sortSelect`);
//const showSkeleton = document.querySelector(`#showSkeleton`);
let currentMovies = [];

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.trim();
    if(searchTerm) {
     fetchMovies(searchTerm)
    }
});
function showSkeletons() {
    const skeletons = Array(10).fill(0).map(() => `
        <div class="movie-card--skeleton">
                <img class="movie-card__img--skeleton"> 
                <h2 class="movie-card__title--skeleton"></h2>
                <p class="movie-card__year--skeleton"></p>
            </div>`).join('');


moviesGrid.innerHTML = skeletons;
}
async function fetchMovies(searchTerm) {
    showSkeletons(); 
    const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`);
    const data = await res.json();

if (data.Response === 'True') {
    currentMovies = data.Search;
    resultsInfo.textContent=`Showing: ${searchTerm}`;
    sortSelect.value = 'default';
    displayMovies(currentMovies);
}
else {
    resultsInfo.textContent=`Showing: ${searchTerm}`;
    moviesGrid.innerHTML= '<p>No Movies Found.</p>';
    currentMovies = [];
   
}
}
function displayMovies(movies) {
  moviesGrid.innerHTML = movies.map((movie) => `
    <div class="movie-card">
      <img class="movie-card__img" src="${movie.Poster}" alt="${movie.Title}">
      <h2 class="movie-card__title">${movie.Title}</h2>
      <p class="movie-card__year">${movie.Year}</p>
    </div>`).join('');

  moviesGrid.querySelectorAll('.movie-card__img').forEach(img => {
    img.addEventListener('error', () => {
      const placeholder = document.createElement('div');
      placeholder.className = 'movie-card__poster-placeholder';
      placeholder.innerHTML = 'Movie Poster <br> Not Available';
      img.replaceWith(placeholder);
    });
  });
} 

sortSelect.addEventListener('change', (e) => {
    sortMovies(e.target.value);
})
function sortMovies(sortType) {
    let sortedMovies = [...currentMovies];

    if(sortType === 'a-z') {
        sortedMovies.sort((a, b) => a.Title.localeCompare(b.Title));
    }
    else if(sortType === 'z-a') {
    sortedMovies.sort((a, b) => b.Title.localeCompare(a.Title));
        }
     else if(sortType === 'newest') {
            sortedMovies.sort((a, b) => Number(b.Year) - Number(a.Year));
        }
     else if(sortType === 'oldest') {
                sortedMovies.sort((a, b) => Number(a.Year) - Number(b.Year));
        }
        displayMovies(sortedMovies);
    }    
