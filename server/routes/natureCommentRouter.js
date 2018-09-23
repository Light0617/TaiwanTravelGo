const express = require('express');
const bodyParser = require('body-parser');

const NatureComments = require('../models/natureComment');
const authenticate = require('../authenticate');
const cors = require('./cors');

const NatureCommentRouter = express.Router();
NatureCommentRouter.use(bodyParser.json());

NatureCommentRouter.route('/')
  .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
  .get(cors.cors, (req, res, next) => {
    NatureComments.find(req.query)
      .then((comments) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(comments);
      }, (err) => next(err))
      .catch((err) => next(err));
  })
  .post(cors.cors, (req, res, next) => {
    NatureComments.create(req.body)
    .then((comment)=>{
      console.log('Comment Created ', comment);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(comment);
    }, (err) => next(err))
    .catch((err) => next(err));
  })
  .put(cors.cors, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /comments/');
  })
  .delete((req, res, next) => {
    NatureComments.remove({})
    .then((resp) =>{
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err))
  });


  NatureCommentRouter.route('/:commentId')
  .options(cors.corsWithOptions, (req, res) => {res.sendStatus(200);})
  .get(cors.cors, (req, res, next) => {
    NatureComments.findById(req.params.commentId)
      .then((comemnt) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(comemnt);
      }, (err) => next(err))
      .catch((err) => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,(req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /comments/'+ req.params.commentId);
  })
  .put(cors.cors, (req, res, next) => {
    NatureComments.findByIdAndUpdate(req.params.commentId, {$set: req.body}, {new: true})
      .then((comment) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(comment);
      }, (err) => next(err))
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    NatureComments.findByIdAndRemove(req.params.commentId)
    .then((resp) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
  });

  module.exports = NatureCommentRouter;