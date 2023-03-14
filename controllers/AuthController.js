const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const flash = require('connect-flash');

const dotenv = require('dotenv');
dotenv.config();


passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user);
  });


class AuthController {
    static async login(req, res) {
        const user = req.user;
        res.render('login.ejs', { user: user });
    }
    
    static async authGoogle(req, res) {
        passport.use(new GoogleStrategy({
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
          return done(null, profile);
        }));
      
        passport.authenticate('google', { scope: ['profile'] })(req, res);
        passport.authenticate('google', { failureRedirect: '/login' })(req, res, () => {
          res.redirect('/');
        });
      }
      
      static async authFacebook(req, res) {
        passport.use(new FacebookStrategy({
            clientID: process.env.FACEBOOK_CLIENT_ID,
             clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
               callbackURL: '/auth/facebook/callback',
               profileFields: ['id', 'displayName', 'email']
             },
             (accessToken, refreshToken, profile, done) => {
               return done(null, profile);
             }
           ));
           passport.authenticate('facebook', { scope: ['email'] })(req, res);
           passport.authenticate('facebook', { failureRedirect: '/login' }),
            (req, res) => {
                res.redirect('/');
            };
      }

      static async authTwitter(req, res) {
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
        passport.authenticate('twitter')(req, res);
        passport.authenticate('twitter', { failureRedirect: '/login' }),
            (req, res) => {
                res.redirect('/');
            };
    }

}

module.exports = AuthController;