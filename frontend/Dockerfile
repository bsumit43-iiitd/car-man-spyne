FROM node:18.7.0-alpine

COPY . /car
WORKDIR /car/
EXPOSE 4007
RUN npm i
RUN npm run build
RUN npm install -g serve

CMD ["serve", "-s", "-l", "4007", "dist/"]

