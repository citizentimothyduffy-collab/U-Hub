document.addEventListener('DOMContentLoaded', () => {
    const movieForm = document.getElementById('movieForm');
    const tvForm = document.getElementById('tvForm');
    const logoutBtn = document.getElementById('logoutBtn');
    const message = document.getElementById('message');

    movieForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('movieTitle').value;
        const genre = document.getElementById('movieGenre').value;
        const year = parseInt(document.getElementById('movieYear').value);
        const videoUrl = document.getElementById('movieVideoUrl').value;

        try {
            const response = await fetch('/api/movies', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, genre, year, videoUrl })
            });
            if (response.ok) {
                message.textContent = 'Movie added successfully!';
                movieForm.reset();
            } else {
                message.textContent = 'Failed to add movie.';
            }
        } catch (error) {
            message.textContent = 'Error: ' + error.message;
        }
    });

    tvForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('tvTitle').value;
        const seasons = parseInt(document.getElementById('tvSeasons').value);
        const videoUrl = document.getElementById('tvVideoUrl').value;

        try {
            const response = await fetch('/api/tvshows', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, seasons, videoUrl })
            });
            if (response.ok) {
                message.textContent = 'TV Show added successfully!';
                tvForm.reset();
            } else {
                message.textContent = 'Failed to add TV show.';
            }
        } catch (error) {
            message.textContent = 'Error: ' + error.message;
        }
    });

    logoutBtn.addEventListener('click', () => {
        window.location.href = '/logout';
    });
});