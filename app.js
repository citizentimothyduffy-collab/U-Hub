document.addEventListener('DOMContentLoaded', () => {
    const moviesBtn = document.getElementById('moviesBtn');
    const tvBtn = document.getElementById('tvBtn');
    const searchInput = document.getElementById('search');
    const loginBtn = document.getElementById('loginBtn');
    const content = document.getElementById('content');

    loginBtn.addEventListener('click', () => {
        window.location.href = '/auth/github';
    });

    moviesBtn.addEventListener('click', () => loadMovies());
    tvBtn.addEventListener('click', () => loadTVShows());
    searchInput.addEventListener('input', () => searchContent());

    async function loadMovies() {
        try {
            const response = await fetch('/api/movies');
            const movies = await response.json();
            displayMovies(movies);
        } catch (error) {
            console.error('Error loading movies:', error);
        }
    }

    async function loadTVShows() {
        try {
            const response = await fetch('/api/tvshows');
            const tvshows = await response.json();
            displayTVShows(tvshows);
        } catch (error) {
            console.error('Error loading TV shows:', error);
        }
    }

    function displayMovies(movies) {
        content.innerHTML = '<h2>Movies</h2>';
        movies.forEach(movie => {
            const card = document.createElement('div');
            card.className = 'movie-card';
            card.innerHTML = `
                <h3>${movie.title}</h3>
                <p>Genre: ${movie.genre}</p>
                <p>Year: ${movie.year}</p>
            `;
            card.addEventListener('click', () => playVideo(movie.videoUrl, movie.title));
            content.appendChild(card);
        });
    }

    function displayTVShows(tvshows) {
        content.innerHTML = '<h2>TV Shows</h2>';
        tvshows.forEach(show => {
            const card = document.createElement('div');
            card.className = 'tv-card';
            card.innerHTML = `
                <h3>${show.title}</h3>
                <p>Seasons: ${show.seasons}</p>
            `;
            card.addEventListener('click', () => playVideo(show.videoUrl, show.title));
            content.appendChild(card);
        });
    }

    function playVideo(url, title) {
        content.innerHTML = `
            <h2>Playing: ${title}</h2>
            <video class="video-player" controls>
                <source src="${url}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
    }

    function searchContent() {
        const query = searchInput.value.toLowerCase();
        // For simplicity, search in loaded content or reload and filter
        loadMovies(); // Reload and filter client-side
        // Implement proper search
    }
});