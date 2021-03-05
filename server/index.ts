const path = require('path');
import express from 'express';
const { db, } = require('./db/db.ts');
const { GoogleStrategy } = require('./passport.ts');
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
const { addItem, getAllItems, deleteItem, savePost, addUser } = require('./db/db.ts');

dotenv.config({ path: path.resolve(__dirname, '../.env'), });

const app = express();
const dist = path.resolve(__dirname, '..', 'client', 'dist');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(dist));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(bodyParser.json());


/*******************DATABASE ROUTES ************************************/

app.get('/items', (req, res) => {
   getAllItems(req.body)
    .then((data: any) => res.json(data))
    .catch((err: any) => console.warn(err));
});

app.post('/items', (req, res) => {
   addItem(req.body)
    .then((data: any) => res.json(data))
    .catch((err: any) => console.warn('HERE ERROR', err));

});

app.post('/whiteboardpost', (req, res) => {
  savePost(req.body)
    .then((data: any) => console.log('Success!', data))
    .catch((err: any) => console.error(err));
});

app.delete('/items/:id', (req, res) => {
  deleteItem(req.params)
    .then((data: any) => res.json(data))
    .catch((err: any) => console.warn(err));
});


/////////GOOGLE AUTH ///////////
app.use(
  session({
    secret: process.env.clientSecret,
    saveUninitialized: false,
    resave: true,
  }),
);

passport.serializeUser((user: any, done: (arg0: any, arg1: any) => void) => {
  done(null, user);
});

passport.deserializeUser((user: any, done: (arg0: any, arg1: any) => void) => {
  done(null, user);
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }), (req: any, res: any) => {
    const { displayName } = req.user;
    // setting cookie key to thesis and saving the username
    res.cookie('thesis', displayName);
    return addUser(displayName)
    .then(() =>  res.redirect('/'))
    .catch((err: string) => console.log('error adding user to db', err))
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


const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});

