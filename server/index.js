const path = require('path');
const express = require('express');
const { GoogleStrategy } = require('./passport.js');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();

const port = 3000;
const dist = path.resolve(__dirname, '..', 'client', 'dist');


app.use(express.static(dist));
app.use(cookieParser());

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
  // check to see if the cookie key is headstrong
  if (req.cookies.thesis) {
    res.json(true);
  } else {
    res.json(false);
  }
});

app.delete('/logout', (req, res) => {
  // delete the cookie key headstrong when logging out
  res.clearCookie('thesis');
  res.json(false);
});


app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});

