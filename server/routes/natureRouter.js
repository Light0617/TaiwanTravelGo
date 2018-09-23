const express = require('express');
const bodyParser = require('body-parser');

const Natures = require('../models/nature');
const authenticate = require('../authenticate');
const cors = require('./cors');

const NatureRouter = express.Router();
NatureRouter.use(bodyParser.json());

NatureRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req, res, next) => {
  Natures.find(req.query)
  .then((natures) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(natures);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.post((req, res, next) => {
  Natures.create(req.body)
  .then((nature) => {
      console.log('Nature Created ', nature);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(nature);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.delete((req, res, next) => {
  Natures.remove({})
  .then((resp) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
  }, (err) => next(err))
  .catch((err) => next(err));
})


NatureRouter.route('/:natureId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req, res, next) => {
  Natures.findById(req.params.natureId)
  .then((nature) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(nature);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.post(cors.cors, (req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /natures/'+ req.params.userId);
})
.put(cors.cors, (req, res, next) => {
  Natures.findByIdAndUpdate(req.params.natureId, {$set: req.body}, {new : true})
    .then((user) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(user);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
  Natures.findByIdAndRemove(req.params.userId)
  .then((resp) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
  }, (err) => next(err))
  .catch((err) => next(err));
});

module.exports =  NatureRouter;