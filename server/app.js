const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config');

const natureRouter = require('./routes/natureRouter');


const app = express();

const mongoose = require('mongoose');
const url = config.mongoUrl;
const connect = mongoose.connect(url);
connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });


// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.end('hello world');
});

app.use('/natures', natureRouter);

app.get('*', (req, res) => {
  res.end('hello world');
});

app.listen(3001, () => {
  console.log('Example app listening on port 3001!')
})