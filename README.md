# Movie & TV Streaming Website

A simple streaming service website with admin panel.

## Features

- Browse movies and TV shows
- Built-in video streaming
- Search functionality
- Admin panel for adding content (GitHub login required)

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Set up GitHub OAuth:
   - Go to GitHub Settings > Developer settings > OAuth Apps > New OAuth App
   - Homepage URL: http://localhost:5000
   - Authorization callback URL: http://localhost:5000/auth/github/callback
   - Copy Client ID and Client Secret to `.env` file

3. Start the server:
   ```
   npm start
   ```

4. Open http://localhost:5000 in your browser.

## Admin Access

- Login with GitHub using the account citizentimothyduffy@gmail.com
- Access admin panel at /admin.html to add movies/TV shows

## Deploying Online

For production, update callback URL in OAuth app and environment variables.

## Notes

- Data is stored in memory; restarts will reset.
- For persistent data, add a database.