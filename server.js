const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Serve static files
app.use(express.static('.'));

// Passport GitHub Strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // Check if email matches admin
    if (profile.emails && profile.emails[0].value === 'citizentimothyduffy@gmail.com') {
      return done(null, profile);
    } else {
      return done(null, false);
    }
  }
));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Routes
app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/admin.html');
  }
);

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.get('/api/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

// Hardcoded data (in real app, use DB)
let movies = [
  { id: 1, title: 'Big Buck Bunny', genre: 'Animation', year: 2008, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
  { id: 2, title: 'Elephant Dream', genre: 'Animation', year: 2006, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
  { id: 3, title: 'For Bigger Blazes', genre: 'Documentary', year: 2012, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' }
];

let tvshows = [
  { id: 1, title: 'Sample TV Show 1', seasons: 2, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4' }
];

app.get('/api/movies', (req, res) => res.json(movies));
app.get('/api/tvshows', (req, res) => res.json(tvshows));

// Admin routes
app.post('/api/movies', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).json({ error: 'Not authenticated' });
  const newMovie = { id: movies.length + 1, ...req.body };
  movies.push(newMovie);
  res.json(newMovie);
});

app.post('/api/tvshows', (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).json({ error: 'Not authenticated' });
  const newShow = { id: tvshows.length + 1, ...req.body };
  tvshows.push(newShow);
  res.json(newShow);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});