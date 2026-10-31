// data    http://www.omdbapi.com/?apikey=bbf6414c&s
// posters http://img.omdbapi.com/?apikey=bbf6414c&

//display mvoie example:
function displayMovies(movies) {
    const movieResuts = movie.map((movie) => {
        const poster = movie.Poster !== 'N/A' ? movie.Poster : ;

        return `
        <div class="movie-card">
        ${poster ? ` <img class="movie-card__img" src="${poster}" alt="${movie.Title}">` : `<div class="movie-card__poster-placeholder">"Movie Poster"<br>"Not Available"</div>
        <h2 class="movie-card__title">${movie.Title}</h2>
        <p class="movie-card__year"> ${movie.Year}</p>
        </div>
`;
    }).join('');



// per HTML
//will need:
//moviesGrid
//searchForm
//resultsInfo
//sortSelect
//