import mongoose from 'mongoose';
import { Schema, Model, model } from 'mongoose';
import moment from 'moment';
import Twilio from 'twilio';
import dotenv from 'dotenv';
import { AnyAaaaRecord } from 'node:dns';
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
dotenv.config();

mongoose.connect('mongodb://localhost/3000', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Mongo database connected'))
  .catch((err) => console.warn(err));

const AppointmentSchema: Schema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  notification: String,
  timeZone: String,
  time: {type: Date, index: true}
});

export const Appointment = mongoose.model('Appointment', AppointmentSchema);

AppointmentSchema.methods.requiresNotification = (date): any => {
  return Math.round(moment.duration(moment(date.time).tz(date.timeZone).utc()
    .diff(moment(date).utc()))
    .asMinutes()) === date.notification;
};



AppointmentSchema.statics.sendNotifications = (callback): any => {
  const searchDate = new Date();
  Appointment.find()
    .then((appointments) => {
      appointments = appointments.filter((appointment) => {
        //return appointment.requiresNotification(searchDate);
      });
      if (appointments.length > 0) {
        sendNotifications(appointments);
      }
    });


  /**
    * Send messages to all appoinment owners via Twilio
    * @param {array} appointments List of appointments.
    */


  const sendNotifications = (appointments: any): void => {
    const client = Twilio(accountSid, authToken);
    appointments.forEach((appointment) => {
    // Create options to send the message
      const options = {
        to: `+ ${appointment.phoneNumber}`,
        from: '+15042852518',
        /* eslint-disable max-len */
        body: `Hi ${appointment.name}. The ${appointment.notification}`,
      /* eslint-enable max-len */
      };

      // Send the message!
      client.messages.create(options)
        .then(() => console.info('message sent', options))
        .catch((err) => console.warn(err));
      //   if (err) {
      //   // Just log it for now
      //     console.error(err);
      //   } else {
      //   // Log the last few digits of a phone number
      //     let masked = appointment.phoneNumber.substr(0,
      //       appointment.phoneNumber.length - 5);
      //     masked += '*****';
      //     console.log(`Message sent to ${masked}`);
      //   }
      // });
    });

    // Don't wait on success/failure, just indicate all messages have been queued for delivery
    // if (callback) {
    //   callback.call();
    // }

    callback ? callback.call() : 'no messages';

  };

};
//export const Appointment = mongoose.model('Appointment', AppointmentSchema);
// module.exports = {
//   Appointment,
//   sendNotifications
// };

const commentSchema = new mongoose.Schema({
  outfitID: Number,
  name: String,
  text: String,
});
const likeSchema = new mongoose.Schema({
  name: String,
  outfitId: Number
});
export const Like = mongoose.model('Like', likeSchema);
export const Comment = mongoose.model('Comment', commentSchema);

const getComments = (): Promise<any> => {
  return Comment.find({})
    .then((data) => console.log(data))
    .catch((err) => console.warn(err));
};

// const postComments = (body: any): Promise<any> => {
//   const newComment = new Comment({
//     outfitID
//   });
// };

