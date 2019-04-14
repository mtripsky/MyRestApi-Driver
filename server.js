const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// set up express app
const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost/drivergo',{ useNewUrlParser: true , useCreateIndex: true});
mongoose.Promise = global.Promise;

// Middlewares (order is important)

app.use(express.static('public'));
// 1. first, parse body into json
app.use(bodyParser.json());
// 2. add routes
app.use('/api', require('./routes/api'));
// 3. error handling
app.use(function(err, req, res, next) {
  res.status(422).send({
    error: err.message});
});


const port = process.env.port || 8000;
app.listen(port, function(){
  console.log(`now listening on port: ${port} for requests`);
});
