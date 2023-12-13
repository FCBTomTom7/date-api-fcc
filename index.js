// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api", (req, res) => {
  let d = new Date();
  let unix = d.getTime();
  let utc = d.toUTCString();
  res.json({
    unix: unix,
    utc: utc
  })
})
// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  // let dateRegex = /-/;
  let unixRegex = /^\d+$/;
  let d = new Date(req.params.date);
  let unix;
  let utc;
  let obj;
  if(!unixRegex.test(req.params.date)) {
    utc = d.toUTCString();
    unix = d.getTime();
  } else {
    unix = parseInt(req.params.date);
    utc = new Date(parseInt(req.params.date)).toUTCString();
  }
  if(!/\d+/.test(utc)) {
    obj = {
      error: utc
    }
  } else {
    obj = {
      unix: unix,
      utc: utc
    }
  }
  
  res.json(obj);
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
