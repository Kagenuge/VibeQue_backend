var express = require('express');
var router = express.Router();
const open = require('open');
require('dotenv').config();

var trackUrl = 'https://p.scdn.co/mp3-preview/3eb16018c2a700240e9dfb8817b6f2d041f15eb1?cid=774b29d4f13844c495f206cafdad9c86';

/* var trackId = '1InSh2VSAlU4SnhIGeUB0j';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.CALLBACK_URL
});

spotifyApi.clientCredentialsGrant()
  .then(function (data) {
    spotifyApi.setAccessToken(data['access_token']);
    console.log(data)
  }, function (err) {
    console.log(err);
  });


async function getTrackOnDemand() {
  spotifyApi.getTrack(trackId)
    .then(function (data) {
      if (data.body.preview_url == null) {
        console.log('Preview url empty');
      } else {
        var audioFile = data.body.preview_url;
        audioFile = audioFile.replace('https://', 'http://');
        child_process.execFile('mplayer', [audioFile],
          function (error, stdout, stderr) {
            console.log(stdout);
          });
      }
    }, function (err) {
      console.error(err);
    });
} */

/* GET home page. */
/* router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
}); */

router.post('/api/songrequest', (req, res) => {
  console.log(req.body.trackUrl)
  trackUrl = req.body.trackUrl;
  res.json(200)
  //getTrackOnDemand();
});

router.post('/api/motiondetected', (req, res) => {
  console.log(req.body.motion);
  console.log('Motion data received');
  let motionState = req.body.motion;
  //Aloita timer joka vaihtaa
  if (motionState) {
    //open(trackUrl);
    res.json(202, {link: trackUrl})
  } else {
    res.send(200)
  }
});


module.exports = router;
