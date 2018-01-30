#/bin/bash

APP_DB_URL=$APP_MONGO_URL \
APP_DB_OPLOG_URL=$APP_MONGO_OPLOG_URL \
KADIRA_API_URL=http://root:secret@localhost:7007/core \
MAIL_URL=$MAIL_URL \
TICK_TRIGGER_INTERVAL=10000 \
MESSENGER_LOGGING_ONLY=1 \
NODE_ENV=production \
  ./node_modules/.bin/nodemon server.js
