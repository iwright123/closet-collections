const path = require('path');
import * as express from "express";
const app = require("express")()
const index = require("./routes/index");
const port = process.env.PORT || 3000;
const { GoogleStrategy } = require('./passport.ts');
const passport = require('passport');
const session = require('express-session');

const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser  = require('body-parser');
const dotenv = require('dotenv')
const { addUser } = require('./db/db.ts')
const http = require('http').createServer(app)
const io = require('socket.io')(http)
////////////////HELPERS////////////////////




const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;


dotenv.config();
////////////////HELPERS////////////////////

import { addItem, getAllItems, deleteItem } from './helpers/Item';



import { getAllWhiteboardPosts, savePost } from './helpers/WhiteBoardPost'
import { saveOutfit, getAllOutfits, deleteOutfit, getUserOutfits } from './helpers/Outfit'

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
app.use(cors())
app.use('/api/search', Find);
/*******************DATABASE ROUTES ************************************/
app.get('/outfit/:user', (req: any, res: any) => {
getUserOutfits(req.cookies.thesis)
.then((data: any) => res.json(data))
.catch((err: any) => console.warn(err))
})
app.get('/outfit', (req: any, res: any) => {
  getAllOutfits()
  .then((data: any) => res.json(data))
    .catch((err: any) => console.warn(err));
})
app.post('/outfit', (req: any, res: any) => {
  saveOutfit(req.body, req.cookies.thesis)
    .then((data: any) => console.log('Outfit created', data))
    .catch((err: any) => console.warn(err))
})

app.get('/items', (req: any, res: any) => {
   getAllItems()
    .then((data: any) => res.json(data))
    .catch((err: any) => console.warn(err));
});

app.get('/whiteboardpost', (req: any, res: any) => {
  getAllWhiteboardPosts()
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

app.delete('/outfit/:id', (req: any, res: any) => {
  deleteOutfit(req.params)
    .then((data: any) => res.json(data))
    .catch((err: any) => console.warn(err))
});
/************************************* */

const CalendarItem = require('./routes/calender');
const { Weather } = require('./api/weather');
const { Location } = require('./api/geolocation');

app.use('/calendar', CalendarItem);
app.use('/api/weather', Weather);
app.use('/api/location', Location)


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


io.on('connection', (socket: any) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('message', ({name, message}) => {
    console.log('message:', message, 'user', name)
    io.emit('message', {name, message})
  });
});






http.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});

