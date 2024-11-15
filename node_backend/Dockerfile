FROM node:alpine


WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app



EXPOSE 4008


CMD [ "npm","run","start" ]
