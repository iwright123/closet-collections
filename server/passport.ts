import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20'
import dotenv, { config} from 'dotenv'
// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
passport.use(new GoogleStrategy({
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
  callbackURL: '/auth/google/callback'
},
function(accessToken: any, refreshToken: any, profile: any, done: any ) {
  console.info(profile);
  // profile is google profile
  // done is being passed to the callback url under key user
  done(null, profile);
}
));
