const express = require('express');
const bodyParser = require('body-parser');

const NatureComments = require('../models/natureComment');
const cors = require('./cors');

const NatureCommentRouter = express.Router();
NatureCommentRouter.use(bodyParser.json());

NatureCommentRouter.route('/')
  .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
  .get(cors.cors, (req, res, next) => {
    NatureComments.find({})
      .then((comments) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(comments);
      }, (err) => next(err))
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    NatureComments.create(req.body)
    .then((comment)=>{
      console.log('Comment Created ', comment);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(comment);
    }, (err) => next(err))
    .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    NatureComments.remove({})
    .then((resp) =>{
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err))
  })

  module.exports = NatureCommentRouter;