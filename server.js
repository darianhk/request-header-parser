// server.js
// where your node app starts

// init project
var express = require('express');
var cors = require('cors');
var bodyparser = require('body-parser');
var UAParser = require('ua-parser-js');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(cors());
app.use(bodyparser.json());

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
  ip = ip.split(',')[0];
  var language = req.headers['accept-language'];
  language = language.split(',')[0];
  var parser = new UAParser();
  var ua = req.headers['user-agent'];
  var os = parser.setUA(ua).getOS().name + " " + parser.setUA(ua).getOS().version;
  res.json({ip: ip, language: language, software: os});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
