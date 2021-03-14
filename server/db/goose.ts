import mongoose from 'mongoose';
import { Schema, Model, model } from 'mongoose';
import moment from 'moment';
import Twilio from 'twilio';
import dotenv from 'dotenv';
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
dotenv.config();

mongoose.connect('mongodb://localhost/3000', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('database connected'))
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
        body: `Hi ${appointment.name}. Just a reminder that you have an item releasing soon.`,
      /* eslint-enable max-len */
      };

      // Send the message!
      client.messages.create(options, (err, response) => {
        if (err) {
        // Just log it for now
          console.error(err);
        } else {
        // Log the last few digits of a phone number
          let masked = appointment.phoneNumber.substr(0,
            appointment.phoneNumber.length - 5);
          masked += '*****';
          console.log(`Message sent to ${masked}`);
        }
      });
    });

    // Don't wait on success/failure, just indicate all messages have been
    // queued for delivery
    if (callback) {
      callback.call();
    }

  };

};
//export const Appointment = mongoose.model('Appointment', AppointmentSchema);

// module.exports = {
//   Appointment,
//   sendNotifications
// };


