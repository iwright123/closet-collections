const path = require('path');
const express = require('express');
const { db, } = require('./db/db.js');
const { GoogleStrategy } = require('./passport.js');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const app = express();
const { addItem, getAllItems } = require('./helpers/Item');

dotenv.config({ path: path.resolve(__dirname, '../.env'), });

const port = 3000;
const dist = path.resolve(__dirname, '..', 'client', 'dist');
const items = require('./routes/items');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(dist));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

/*******************DATABASE ROUTES ************************************/

app.get('/items', (req, res) => {
  return getAllItems(req.body)
    .then((data) => res.json(data))
    .catch((err) => console.warn(err));
});

app.post('/items', (req, res) => {
  //console.log('LOOK HEREeEEEEEEE', req)
  addItem(req.body)
    .then(data => {
      console.log('SUCCESS', data);
    })
    .catch((err) => {
      console.error(err);
    });

});
///////////GOOGLE AUTH ///////////
app.use(
  session({
    secret: process.env.clientSecret,
    saveUninitialized: false,
    resave: true,
  }),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // setting cookie key to thesis and saving the username
    res.cookie('thesis', req.user.displayName);
    res.redirect('/');
  });

app.get('/isloggedin', (req, res) => {
  // check to see if the cookie key is thesis
  if (req.cookies.thesis) {
    res.json(true);
  } else {
    res.json(false);
  }
});

app.delete('/logout', (req, res) => {
  // delete the cookie key thesis when logging out
  res.clearCookie('thesis');
  res.json(false);
});
///////////GOOGLE AUTH ^^^^^^///////////



app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});

