// Load third party modules
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

// Instantiate Express application
var app = express();

// Set environment variables
app.set('port', (process.env.PORT || 3000));

function processData(data) {
  return data.payload

    // Reduce payload array to media items with DRM and an episode count of
    // at least one.
    .filter(function(item) {
      return item.drm === true && item.episodeCount > 0;
    })

    // Transform each object to only hold image, slug and title information
    .map(function(item) {
      return {
        image: item.image.showImage,
        slug: item.slug,
        title: item.title
      };
    });
}

// Server logging
app.use(morgan('dev'));

// Middleware to parse JSON requests
app.use(bodyParser.json());

// For each JSON request, ensure that a payload array exists.  Throw an error if
// check fails.
app.use(function(req, res, next) {
  if (Array.isArray(req.body.payload) === false) {
    throw "invalidFormat";
  }

  next();
});

// Middleware function for handling all errors thrown, including any errors parsing
// requests with body-parser.
app.use(function(err, req, res, next) {
  res
    .status(400)
    .send({ error: "Could not decode request: JSON parsing failed" });
});

// Process data for POST requests to the root path
app.post('/', function(req, res) {
  res.send({ response: processData(req.body) });
});

// Start server listening at the port set via the environment variable
app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});
