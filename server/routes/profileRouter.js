const express = require('express');
const bodyParser = require('body-parser');
const User = require('../models/user');
const authenticate = require('../authenticate');

const cors = require('./cors');

var ProfileRouter = express.Router();
ProfileRouter.use(bodyParser.json());

var getUserId = (req) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = authenticate.getUser(token);
    return decoded._id;
  } else {
    return null;
  }
}

ProfileRouter.route('/')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200)})
.get(cors.cors, (req, res, next) => {
  const userId = getUserId(req);
  User.findById(userId)
    .then((user) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(user);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, (req, res, next) => {
  res.statusCode = 403;
  res.setHeader('Content-Type', 'text/plain');
  res.end('POST operation not supported on /profile/');
})
.put(cors.corsWithOptions, (req, res, next) => {
  res.statusCode = 403;
  res.setHeader('Content-Type', 'text/plain');
  res.end('PUT operation not supported on /profile/');
})
.delete(cors.corsWithOptions, (req, res, next) => {
  res.statusCode = 403;
  res.setHeader('Content-Type', 'text/plain');
  res.end('DELETE operation not supported on /profile/');
});

module.exports = ProfileRouter;