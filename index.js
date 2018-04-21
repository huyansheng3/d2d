var express = require('express');
var compression = require('compression');
var connectHistoryApiFallback = require('connect-history-api-fallback');

var port = process.env.PORT || 6773;

var app = express();

app.use(compression());
app.use(connectHistoryApiFallback());

app.use('/', express.static('./build'));

// Listen
app.listen(port, err => {
  if (err) {
    console.error(err);
  } else {
    console.log('running in the ' + port);
  }
});
