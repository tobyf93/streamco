var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('This is a test!');
});

app.post('/', function(req, res) {
  res.set('Content-Type', 'application/json');

  resBody = processData(req.body);
  res.send(JSON.stringify(resBody));
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
