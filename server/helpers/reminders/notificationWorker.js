/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { sendNotifications } from '../../db/goose';

export const notificationWorker = () => {
  return {
    run: () => {
      sendNotifications();
    },
  };
};

module.exports = notificationWorker();
