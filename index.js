var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();
app.set('port', (process.env.PORT || 3000));

function processData(data) {
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
}

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  if (Array.isArray(req.body.payload) === false) {
    throw "invalidFormat";
  }

  next();
});

app.use(function(err, req, res, next) {
  res
    .status(400)
    .send({
      error: "Could not decode request: JSON parsing failed"
    });
});

app.post('/', function(req, res) {
  res.send({
    response: processData(req.body)
  });
});

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});
