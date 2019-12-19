var express = require('express');
var router = express.Router();
var db = require('./user_service');
require('dotenv').config();

var trackUrl = 'https://p.scdn.co/mp3-preview/3eb16018c2a700240e9dfb8817b6f2d041f15eb1?cid=774b29d4f13844c495f206cafdad9c86';

router.post('/api/songrequest', (req, res) => {
  console.log(req.body.trackUrl)
  trackUrl = req.body.trackUrl;
  res.json(200)
});

router.post('/api/motiondetected', (req, res) => {
  console.log(req.body.motion);
  console.log('Motion data received');
  let motionState = req.body.motion;
  if (motionState) {
    res.json(202, { link: trackUrl })
  } else {
    res.send(200)
  }
});

router.get('/api/users', function (req, res, next) {
  db.getAll(req, results => {
    res.json(results);
  });
});

router.post('/api/users', (req, res) => {
    console.log(req.body)
    db.createUser(req, (msg) => {
      res.status(201)
      res.send(msg);
    })
  })

router.route('/api/users/:id')
  .get(function (req, res) {
    console.log(req.params.id)
    db.getById(req, result => {
      if (!result) res.status(404);
      res.json(result);
    });
  })



module.exports = router;
