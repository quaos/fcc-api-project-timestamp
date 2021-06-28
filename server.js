// server.js
// where your node app starts

// init project
const express = require('express');
const cors = require('cors');

const dateService = require('./services/date');

const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

const dateSvc = dateService({});

app.get("/api/:date?", (req, res) => {
  try {
    const result = dateSvc.parseDate(req.params.date);
    res.json(result);
  } catch (err) {
    res.status(err.statusCode || 500)
      .json({ error: err.message });
  }
});

const port = process.env.PORT || 3000;

// listen for requests :)
const listener = app.listen(port, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
