// eslint-disable-next-line @typescript-eslint/no-var-requires
const CronJob = require('cron').CronJob;
import { notificationWorker } from './notificationWorker';
import moment from 'moment';

export const schedulerFactory = (): any => {
  return {
    start: (): any => {
      new CronJob('00 * * * * *', (): any => {
        console.log('Running Send Notifications Worker for ' +
          moment().format());
        notificationWorker.run();
      }, null, true, '');
    },
  };
};

module.exports = schedulerFactory();


