var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(function(err, req, res, next) {
  res.send({
    error: "Could not decode request: JSON parsing failed"
  });
});

app.get('/', function (req, res) {
  res.send('This is a test!');
});

app.post('/', function(req, res) {
  resBody = processData(req.body);
  res.send(resBody);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

var processData = function(data) {
  return data.payload
    .filter(function(item) {
      return item.drm === true && item.episodeCount > 0;
    })
    .map(function(item) {
      return {
        image: item.image.showImage,
        slug: item.slug,
        title: item.title
      };
    });
};
