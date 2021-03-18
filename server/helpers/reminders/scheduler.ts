// eslint-disable-next-line @typescript-eslint/no-var-requires
const { CronJob } = require('cron');
import { notificationWorker } from './notificationWorker';
import moment from 'moment';

export const schedulerFactory = (): any => {
  return {
    start: (): any => {
      new CronJob('00 * * * * *', (): any => {
        // CronJob('0 10 6 3 2')
        console.log('Running Send Notifications Worker for ' +
          moment().format());
        notificationWorker();
      }, null, true, '');
    },
  };
};

module.exports = schedulerFactory();


