var haveFetchedMovies = false;

var movieDataContainer = document.querySelector(".movie-data-container");

var cssHtml = document.querySelector("html");

function onMoviesRequested() {
    if (haveFetchedMovies) {
        return;
    }
    fetchMovies();
    haveFetchedMovies = true;
}

function generateMovieCard(title, director, producer, releaseDate) {
    var movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    var titleText = document.createElement("h2");
    titleText.classList.add("movie-title");
    titleText.innerHTML = title;

    var creditsText = document.createElement("p");
    creditsText.classList.add("movie-credits");
    creditsText.innerHTML = "Directed by <b>" + director + "</b><br>Produced by <b>" + producer + "</b><br>Released <b>" + releaseDate + "</b>";

    movieCard.appendChild(titleText);
    movieCard.appendChild(creditsText);

    movieDataContainer.appendChild(movieCard);
}

async function fetchMovies() {
    cssHtml.style.setProperty("--cursor-style", "progress");

    const response = await fetch("https://swapi.dev/api/films?format=json");
    const moviesData = await response.json();

    cssHtml.style.setProperty("--cursor-style", "auto");

    const moviesDataStripped = moviesData.results;
    
    for (let i = 0; i < moviesData.count; i++) {
        const currentMovieData = moviesDataStripped[i];
        generateMovieCard(
            currentMovieData.title, 
            currentMovieData.director, 
            currentMovieData.producer, 
            currentMovieData.release_date,
        )
    }
}