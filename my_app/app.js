const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const flash = require('connect-flash');

const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
));

//passport.use(new FacebookStrategy({
 //   clientID: process.env.FACEBOOK_CLIENT_ID,
  //  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  //  callbackURL: '/auth/facebook/callback',
  //  profileFields: ['id', 'displayName', 'email']
 // },
  //(accessToken, refreshToken, profile, done) => {
 //   return done(null, profile);
  //}
//));

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: '/auth/twitter/callback',
    includeEmail: true
  },
  (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
));

app.get('/', (req, res) => {
  const user = req.user; // define the user variable
  res.render('index.ejs', { user: user });
});

app.get('/about', (req, res) => {
  const user = req.user; // define the user variable
  res.render('about.ejs', { user: user });
});

app.get('/login', (req, res) => {
  const user = req.user; // define the user variable
  res.render('login.ejs', { user: user }, { error: req.flash('error') });
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  });

app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['email'] }));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  });

app.get('/auth/twitter',
  passport.authenticate('twitter'));

app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  });

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
