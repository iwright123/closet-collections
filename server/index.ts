import path from 'path';
import * as express from 'express';
const app = require('express')();
const index = require('./routes/index');
const port = process.env.PORT || 3000;
const { GoogleStrategy } = require('./passport.ts');
const passport = require('passport');
const session = require('express-session');

const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { addUser } = require('./db/db.ts');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
////////////////HELPERS////////////////////




const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
import client from 'twilio';
client(accountSid, authToken);
import MessagingResponse = require('twilio');
import { twiml } from 'twilio';
twiml.MessagingResponse;


dotenv.config();
////////////////HELPERS////////////////////

import { addItem, getAllItems, deleteItem } from './helpers/Item';
import { getAllWhiteboardPosts, savePost } from './helpers/WhiteBoardPost';
import { saveOutfit, getAllOutfits, deleteOutfit, getUserOutfits } from './helpers/Outfit';
import Find from './api/findastore';

////////////////HELPERS////////////////////

dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '../.env'), });


const dist = path.resolve(__dirname, '..', 'client', 'dist');

app.use(index);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(dist));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use('/api/search', Find);
/*******************DATABASE ROUTES ************************************/
app.get('/outfit/:user', (req, res) => {
  getUserOutfits(req.cookies.thesis)
    .then((data) => res.json(data))
    .catch((err) => console.warn(err));
});
app.get('/outfit', (req, res) => {
  getAllOutfits()
    .then((data) => res.json(data))
    .catch((err) => console.warn(err));
});
app.post('/outfit', (req, res) => {
  saveOutfit(req.body, req.cookies.thesis)
    .then((data) => console.log('Outfit created', data))
    .catch((err) => console.warn(err));
});

app.get('/items', (req, res) => {
  getAllItems()
    .then((data) => res.json(data))
    .catch((err) => console.warn(err));
});

app.get('/whiteboardpost', (req, res) => {
  getAllWhiteboardPosts()
    .then((data) => res.json(data))
    .catch((err) => console.warn(err));
});

app.post('/items', (req, res) => {
  addItem(req.body)
    .then((data) => res.json(data))
    .catch((err) => console.warn('HERE ERROR', err));

});

app.post('/whiteboardpost', (req, res) => {
  savePost(req.body)
    .then((data) => console.log('Success!', data))
    .catch((err) => console.error(err));
});

app.delete('/items/:id', (req, res) => {
  deleteItem(req.params)
    .then((data) => res.json(data))
    .catch((err) => console.warn(err));
});

app.delete('/outfit/:id', (req, res) => {
  deleteOutfit(req.params)
    .then((data) => res.json(data))
    .catch((err) => console.warn(err));
});
/************************************* */

import CalendarItem from './routes/calender';
import Weather from './api/weather';
import Location from './api/geolocation';

app.use('/calendar', CalendarItem);
app.use('/api/weather', Weather);
app.use('/api/location', Location);


/////////GOOGLE AUTH ///////////
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
  passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    const { displayName } = req.user;
    // setting cookie key to thesis and saving the username
    res.cookie('thesis', displayName);
    return addUser(displayName)
      .then(() => res.redirect('/'))
      .catch((err) => console.log('error adding user to db', err));
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

/////////Twilio//////////
// app.post('/sms', (req, res) => {
//   const { body } = req.body
//   console.log('text?>', body)
// client.messages.create({
//    body: body,
//    from: '+15042852518',
//    to: '+15047235163'
//  })
// .then((message: any) => console.log('message sid', message.sid))
// .catch((err: any) => console.warn('twilio error', err))
// })
/////////Twilio//////////


io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('message', ({name, message}) => {
    console.log('message:', message, 'user', name);
    io.emit('message', {name, message});
  });
});






http.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});

