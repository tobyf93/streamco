var request = require('request');

var errorReturned = function(body) {
  body = JSON.parse(body);

  if (body.error) {
    return true;
  } else {
    return false;
  }
};

describe('POST /', function() {
  describe('when invalid JSON is received', function() {
    it("should return 400 response with error", function(done) {
      request.post("http://localhost:3000", 'some string', function(err, res, body){
        expect(res.statusCode).toBe(400);
        expect(errorReturned(body)).toBe(true);
        done();
      });
    });
  });

  describe('when valid JSON is received', function() {
    describe('and in the incorrect format', function() {
      it("should return 400 response with error", function(done) {
        request.post("http://localhost:3000", '{"toby": "flemming"}', function(err, res, body){
          expect(res.statusCode).toBe(400);
          expect(errorReturned(body)).toBe(true);
          done();
        });
      });
    });

    describe('and in the correct format', function() {
      expect(true).toBe(false);
    });
  });
});

// POST request with JSON in valid format should return JSON response
// POST request with invalid JSON should return 400 error
// POST request with JSON in invalid format should return 400 error
