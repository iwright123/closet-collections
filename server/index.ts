const path = require('path');
import * as express from "express";
const app = require("express")()
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 3000;


const { GoogleStrategy } = require('./passport.ts');
import  passport from 'passport';
import  session from 'express-session';
const cloudinary = require('cloudinary')
const cors = require('cors');
import  cookieParser from 'cookie-parser';
import  bodyParser from 'body-parser';
import  dotenv from 'dotenv';
dotenv.config();
import { Server, Socket } from "socket.io";
const httpServer = require("http").createServer()
////////////////HELPERS////////////////////

import { addItem, getAllItems, deleteItem } from './helpers/Item';
const { addUser } = require('./db/db.ts')
import { savePost } from './helpers/WhiteBoardPost'

////////////////HELPERS////////////////////

dotenv.config({ path: path.resolve(__dirname, '../.env'), });


const dist = path.resolve(__dirname, '..', 'client', 'dist');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(dist));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors())
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  })

/*******************DATABASE ROUTES ************************************/

app.get('/items', (req: any, res: any) => {
   getAllItems()
    .then((data: any) => res.json(data))
    .catch((err: any) => console.warn(err));
});

app.post('/items', (req: any, res: any) => {
   addItem(req.body)
    .then((data: any) => res.json(data))
    .catch((err: any) => console.warn('HERE ERROR', err));

});

app.post('/whiteboardpost', (req: any, res: any) => {
  savePost(req.body)
    .then((data: any) => console.log('Success!', data))
    .catch((err: any) => console.error(err));
});

app.delete('/items/:id', (req: any, res: any) => {
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

app.get('/isloggedin', (req: any, res: any) => {
  // check to see if the cookie key is thesis
  if (req.cookies.thesis) {
    res.json(true);
  } else {
    res.json(false);
  }
});

app.delete('/logout', (req: any, res: any) => {
  // delete the cookie key thesis when logging out
  res.clearCookie('thesis');
  res.json(false);
});
///////////GOOGLE AUTH ^^^^^^///////////


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


http.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});

