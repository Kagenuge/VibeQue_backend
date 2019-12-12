var express = require('express');
var router = express.Router();
const open = require('open');
const Mplayer = require('mplayer');
const SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();

var trackUrl = 'https://open.spotify.com/track/03Fst3VTu65vDjTkTI2lkm?si=dd6WPkoISnaO2ySBf9e1jg';

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
  console.log(req.body)
  trackUrl = req.body.trackUrl;
  res.send('Request received')
  //getTrackOnDemand();
});

router.get('/api/motiondetected', (req, res) => {
  console.log('Motion detected!')
  open(trackUrl);
  res.send(200)
});

module.exports = router;
