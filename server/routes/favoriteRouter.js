const express = require('express');
const bodyParser = require('body-parser');

const Favorites = require('../models/favorite');
const authenticate = require('../authenticate');
const cors = require('./cors');

const FavoriteRouter = express.Router();
FavoriteRouter.use(bodyParser.json());

FavoriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200)})
.get(cors.cors, (req, res, next) => {
  Favorites.findOne({user: req.body._id})
  .populate('user')
  .populate('natures')
  .exec((err, favorite) => {
    console.log("id=" + req.user._id);
    if(err) return next(err);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(favorite);
  });
})
.post(cors.corsWithOptions, (req, res, next) => {
  Favorites.findOne({user : req.user._id}, (err, favorite) => {
    if(err) return err;
    if(!favorite){
      Favorites.create({user: req.user._id})
      .then((favorite) => {
        for(i = 0; i < req.body.length; i++){
          if(favorite.natures.indexOf(req.body[i]._id) < 0){
            favorite.natures.push(req.body[i]);
          }
        }
        favorite.save()
        .then((favorite) => {
          console.log("Favorite created!");
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(favorite);
        }).catch((err) => next(err));
      }).catch((err) => next(err));
    } else{
      for(i = 0; i < req.body.length; i++){
        if(favorite.natures.indexOf(req.body[i]._id) < 0){
          favorite.natures.push(req.body[i]);
        }
      }
      favorite.save()
      .then((favorite) => {
        console.log("Favorite created!");
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorite);
      }).catch((err) => next(err));
    }
  });
})
.put(cors.corsWithOptions, (req, res, next) => {
  res.statusCode = 403;
  res.setHeader('Content-Type', 'text/plain');
  res.end('PUT operation not supported on /favorites/');
})
.delete(cors.corsWithOptions, (req, res, next) => {
  Favorites.findOneAndRemove({ user: req.user }, (err, resp) => {
    if(err) return next(err);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(resp);
  });
});


FavoriteRouter.route('/:natureId')
  .options(cors.corsWithOptions, authenticate.verifyUser, (req, res) => { res.sendStatus(200); })
  .get(cors.cors, authenticate.verifyUser, (req,res,next) => {
    Favorites.findOne({ user : req.user._id})
    .then((favorites) => {
      if(!favorites){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application-json');
        return res.json({"exists" : false, "favorites" : favorites});
      } else{
        if(favorites.natures.indexOf(req.params.natureId) < 0){
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application-json');
          return res.json({"exists" : false, "favorites" : favorites});
        } else{
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application-json');
          return res.json({"exists" : true, "favorites" : favorites});
        }
      }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, (req, res, next) => {
  Favorites.findOne({ user : req.user._id}, (err, favorite) => {
    if(err) return next(err);
    if(!favorite) {
      Favorites.create({ user: req.user._id })
      .then((favorite) => {
        favorite.natures.push({"_id" : req.params.natureId})
        favorite.save()
        .then((favorite) => {
          console.log("Favorite created!");
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(favorite);
        }).catch((err) => next(err));
    }).catch((err) => next(err));
  } else{
    if(favorite.natures.indexOf(req.params.natureId) < 0){
      favorite.natures.push({ "_id" : req.params.natureId});
      favorite.save()
      .then((favorite) => {
        console.log("Favorite Nature Added!");
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorite);
      }).catch((err) => next(err));
    } else{
      res.statusCode = 403;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Nature ' + req.params.natureId + 'already exists');
      }
    }
  });
})
.put(cors.corsWithOptions, (req, res, next) => {
  res.statusCode = 403;
  res.setHeader('Content-Type', 'text/plain');
  res.end('PUT operation not supported on /favorites/:natureId');
})
.delete(cors.corsWithOptions, (req, res, next) => {
  Favorites.findOne({ user : req.user._id}, (err , favorite) => {
    if(err) return next(err);
    var index = favorite.natures.indexOf(req.params.natureId);
    if(index >= 0){
      favorite.natures.splice(index, 1);
      favorite.save()
      .then((favorite) => {
        console.log("Favorite Nature Deleted!");
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorite);
      }).catch((err) => next(err));
    } else{
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Nature ' + req.params._id + 'not yours');
    }
  });
});

module.exports = FavoriteRouter;