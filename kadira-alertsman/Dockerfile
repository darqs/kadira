FROM node:8-alpine

RUN \
 apk upgrade --update && \
 apk add --no-cache ca-certificates python g++ make

WORKDIR /app

ADD ./package.json /app/
RUN npm install
ADD . /app

ENV MONGO_APP_URL mongodb://dbserver/apm
ENV MONGO_SHARD_URL_one mongodb://dbserver/apm
ENV MAIL_URL smtp://user:pass@smtp.mailgun.org:587
ENV KADIRA_API_URL=http://root:secret@localhost:7007/core
ENV TICK_TRIGGER_INTERVAL=10000

CMD [ "npm", "run", "start" ]
