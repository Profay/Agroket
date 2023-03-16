const express = require('express');
const router = require('./routes');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const config = require('./config')
const { auth } = require('express-openid-connect');
require('dotenv').config();


const app = express();

const port = process.env.PORT || 9000;

app.use(express.json());
app.set('view engine', 'ejs');
app.use('/', router);
app.use(express.static('public'));
app.use(auth(config));


app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
})
.catch((err) => {
  console.log(err);
});

