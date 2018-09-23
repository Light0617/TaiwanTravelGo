const express =  require('express');
const cors = require('cors');

const app = express();

//server going to accept
const ip = 'http://localhost'
const whitelist = [ip + ':3000', ip + ':3001', ip + ':5000'];


var corsOptionsDelegate = (req, callback) => {
  var corsOptions;
  console.log(req.header('Origin'));
  if(whitelist.indexOf(req.header('Origin')) != -1){
    //accept,
    corsOptions = {origin: true};
  } else {
    corsOptions = {origin: false};
  }
  callback(null, corsOptions);
};


exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);
