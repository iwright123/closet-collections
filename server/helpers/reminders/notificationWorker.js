/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const sendNotifications = require('../../db/goose');

export const notificationWorker = () => {
  return {
    run: () => {
      sendNotifications();
    },
  };
};

module.exports = notificationWorker();
