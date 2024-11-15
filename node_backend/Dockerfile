FROM node:alpine


WORKDIR /app

COPY package.json /app

RUN npm install

COPY create-env.js /app/create-env.js
RUN node /app/create-env.js


COPY . /app



EXPOSE 4008


CMD [ "npm","run","start" ]
