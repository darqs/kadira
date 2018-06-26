#/bin/bash

APP_DB_URL=mongodb://192.168.7.84/kadira \
APP_DB_OPLOG_URL=mongodb://192.168.7.84/kadira \
KADIRA_API_URL=http://root:darqs1122@192.168.7.84:7007/core \
MAIL_URL=smtp://postmaster%40arunoda.mailgun.org:71d5vp8eji62@smtp.mailgun.org:587 \
TICK_TRIGGER_INTERVAL=10000 \
MESSENGER_LOGGING_ONLY=1 \
  ./node_modules/.bin/nodemon server.js
