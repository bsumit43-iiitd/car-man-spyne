var createError = require('http-errors');
var express = require('express');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
var path = require('path');
const cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv');
const mongoClient = require('./utils/connectDb');

var carRouter = require('./routes/carRouter');

var app = express();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0", // Swagger version
    info: {
      title: "Node.js API",
      version: "1.0.0",
      description: "A simple Express API",
    },
    servers: [
      {
        url: "http://localhost:3002", // URL of your API
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to the API files with JSDoc comments
};


// Create Swagger Docs
const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.get("/", (req, res) => {
  res.send("Welcome to the Home Page!");
});


// Serve Swagger UI
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));



app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


mongoClient.connectDb();


// app.use('/api/auth', authRouter);
app.use('/api/cars', carRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
