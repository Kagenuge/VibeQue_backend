var express = require('express');
var router = express.Router();
const open = require('open');
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
    res.json(202, {link: trackUrl})
  } else {
    res.send(200)
  }
});


module.exports = router;
