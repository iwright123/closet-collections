import mongoose from 'mongoose';
import { Schema, Model, model } from 'mongoose';
import moment from 'moment';
import Twilio from 'twilio';
import dotenv from 'dotenv';
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
dotenv.config();

mongoose.connect('mongodb://localhost/3000', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Mongo database connected'))
  .catch((err) => console.warn(err));

const AppointmentSchema: Schema = new mongoose.Schema({
  phoneNumber: String,
  notification: String,
  sendNotification: {type: Date, index: true},
  time: {type: Date, index: true}
});

export const Appointment = mongoose.model('Appointment', AppointmentSchema);

// add reminder into db
// set interval to find reminders in the db or create a function that finds all reminders
// push reminders into a storage
// if the storage has a length add them to the message
// create and send message with twilio
// remove reminder
// use set interval to check the storage if step 2 isn't an interval function
// eslint-disable-next-line prefer-const

const notificationCheck = (): any => {
  // find all notifications in db
  Appointment.find({})
    .then((data) => {
      const needToSend = [];

      needToSend.push(data);
      // loop all data
      needToSend.forEach((data) => {
        // now loop single object of data
        data.forEach((obj) => {
          // this variable is set to the release date subtracted by 1 day example -> takes 3/18/21 and turns it into 3/17/21
          const dayBeforeRelease = moment(obj.time).subtract(1, 'days').format('L');
          // sendNoti is assigned to send notification date which is one prior to release date of item
          const sendNoti = moment(obj.sendNotification).format('L');
          // release date is the reaslse date of item not being used but its just formatted 01/01/21
          const releaseDate = moment(obj.time).format('L');
          // if the day before the release is equal to the day that a notification needs to be send out (one day prior to release)
          // if (dayBeforeRelease === sendNoti) {
          //   const options = {
          //     to: obj.phoneNumber,
          //     from: '+15042852518',
          //     body: `Hello this a reminder that the ${obj.notification}`,
          //   };

          //   const client = Twilio(accountSid, authToken);

          //   client.messages.create(options)
          //     .then(() => console.info('message sent'))
          //     .catch((err) => console.warn(err));
          // }

        });
      });
    }).catch((err) => console.warn(err));
};

// Appointment.remove({
//   phoneNumber: '+15047235163'
// }).then(() => console.log('deleted'));


// set function to run every 24 hours
// setInterval(notificationCheck, 10000);































// const requiresNotification = (appointment: any, date: any): any => {
//   const makeAppointmentNotification: any = appointment;
//   const dateOfAppointment = Math.round(moment.duration(moment(date.time).tz(date.timeZone).utc()
//     .diff(moment(date).utc()))
//     .asMinutes()) === date.notification;
//   makeAppointmentNotification.notificationDate = dateOfAppointment;
//   return makeAppointmentNotification;
// };

// AppointmentSchema.statics.sendNotifications = (callback): any => {
//   const searchDate = new Date();
//   Appointment.find()
//     .then((appointments) => {
//       appointments = appointments.filter((appointment) => {
//         return requiresNotification(appointment, searchDate);
//       });
//       console.log(appointments, 'line 42');
//       if (appointments.length > 0) {
//         sendNotifications(appointments);
//       }
//     });


//   /**
//     * Send messages to all appoinment owners via Twilio
//     * @param {array} appointments List of appointments.
//     */


//   const sendNotifications = (appointments: any): void => {
//     const client = Twilio(accountSid, authToken);
//     appointments.forEach((appointment) => {
//     // Create options to send the message
//       const options = {
//         to: `+ ${appointment.phoneNumber}`,
//         from: '+15042852518',
//         /* eslint-disable max-len */
//         body: `Hi ${appointment.name}. The ${appointment.notification}`,
//       /* eslint-enable max-len */
//       };

//       // Send the message!
//       client.messages.create(options)
//         .then(() => console.info('message sent', options))
//         .catch((err) => console.warn(err));
//       //   if (err) {
//       //   // Just log it for now
//       //     console.error(err);
//       //   } else {
//       //   // Log the last few digits of a phone number
//       //     let masked = appointment.phoneNumber.substr(0,
//       //       appointment.phoneNumber.length - 5);
//       //     masked += '*****';
//       //     console.log(`Message sent to ${masked}`);
//       //   }
//       // });
//     });

//     // Don't wait on success/failure, just indicate all messages have been queued for delivery
//     // if (callback) {
//     //   callback.call();
//     // }

//     callback ? callback.call() : 'no messages';

//   };

// };
//export const Appointment = mongoose.model('Appointment', AppointmentSchema);

// module.exports = {
//   Appointment,
//   sendNotifications
// };


