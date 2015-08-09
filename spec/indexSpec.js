var request = require('request');
var fs = require('fs');

describe('POST /', function() {
  var reqOptions;
  beforeEach(function() {
    reqOptions = {
      uri: 'http://localhost:3000',
      method: 'POST',
    };
  });

  describe('when invalid JSON is received', function() {
    beforeEach(function() {
      reqOptions.json = 'some string that is not JSON';
    });

    it('returns 400 status code', function(done) {
      request.post(reqOptions, function(err, res, body){
        expect(res.statusCode).toBe(400);
        done();
      });
    });

    it('returns JSON with an error', function(done) {
      request.post(reqOptions, function(err, res, body){
        expect(body.error).toBeDefined();
        done();
      });
    });
  });

  describe('when valid JSON is received', function() {
    describe('and in the incorrect format', function() {
      beforeEach(function() {
        reqOptions.json = '{"toby": "flemming"}';
      });

      it('returns 400 status code', function(done) {
        request.post(reqOptions, function(err, res, body){
          expect(res.statusCode).toBe(400);
          done();
        });
      });

      it('returns JSON with an error', function(done) {
        request.post(reqOptions, function(err, res, body){
          expect(body.error).toBeDefined();
          done();
        });
      });
    });

    describe('and in the correct format', function() {
      beforeEach(function() {
        var correctJSON = fs.readFileSync(__dirname + '/correctJSON', {encoding: 'utf8'});
        correctJSON = JSON.parse(correctJSON);

        reqOptions.json = correctJSON;
      });

      it('returns 200 status code', function(done) {
        request.post(reqOptions, function(err, res, body){
          expect(res.statusCode).toBe(200);
          done();
        });
      });

      it('returns JSON without errors', function(done) {
        request.post(reqOptions, function(err, res, body) {
          expect(body.error).not.toBeDefined();
          done();
        });
      });
    });
  });
});
