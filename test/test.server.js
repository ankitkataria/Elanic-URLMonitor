var config = require('../config/config.json');
var URL = require('../models/url.js');
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app.js');
var should = chai.should();

chai.use(chaiHttp);

describe('URLs', function() {
  beforeEach(function(done) {
    URL.deleteAll()
      .then(function(result) {
        done();
      });
  });
});

describe('POST /', function() {
  it('should add a URL for monitoring', function(done) {

    var url = {
      'headers': {
        'some': 'header',
      },
      'data': {
        'some': 'data',
      },
      'url': 'http://www.youtube.com/',
      'method': 'get',
    };

    chai.request(app)
      .post('/')
      .send(url)
      .end(function(err, result) {
        result.should.have.status(200);
        result.body.should.be.a('object');
        result.body.should.have.property('_id');
        result.body.should.have.property('success').eql(true);
        if (err) done(err);
        done();
      });
  });
});

describe('GET /:id', function() {
  it('should get the url against the corresponding _id', function(done) {
    URL.retrieveURLs({})
      .then(function(urls) {
        var id = urls[0]._id;
        chai.request(app)
          .get('/' + id)
          .end(function(err, result) {
            result.should.have.status(200);
            result.body.should.be.a('object');
            result.body.should.have.property('responses');
            result.body.should.have.property('50th_percentile');
            result.body.should.have.property('75th_percentile');
            result.body.should.have.property('95th_percentile');
            result.body.should.have.property('99th_percentile');
            result.body.should.have.property('_id').eql(urls[0]._id);
            result.body.should.have.property('url').eql(urls[0].url);
            result.body.should.have.property('method').eql(urls[0].method);

            if (err) done(err);
            done();
          });
      });
  });
});

describe('GET /', function() {
  it('should give an array of all stored URLs', function(done) {
    chai.request(app)
      .get('/')
      .end(function(err, result) {
        result.body.should.have.property('urls');
        result.should.have.status(200);

        // checking if the data that has been returned actually matches the db or not
        result.body.urls.forEach((url, index) => {
          URL.retrieveURLs({_id: url._id})
            .then(function(urlInDB) {
              if (urlInDB[0]._id != url._id)
                done(new Error('Data did not match the DB'));
            });
        });
        done();
      });
  });
});

describe('PUT /:id', function() {
  it('should update the url in the DB', function(done) {
    URL.retrieveURLs({})
      .then(function(urls) {
        var id = urls[0]._id;
        chai.request(app)
          .put('/' + id)
          .send({'data': 'test'})
          .end(function(err, result) {
            result.should.have.status(200);
            result.body.should.be.a('object');
            result.body.should.have.property('_id').eql(id.toString());
            result.body.should.have.property('success').eql(true);

            // checking whether data updated in the DB
            URL.retrieveURLs({_id: id})
              .then(function(url) {
                if (url[0].data != 'test') {
                  done(new Error('Data not updated'));
                }
              });

            if (err) done(err);
            else done();
          });
      });
  });
});

describe('DELETE /:id', function() {
  it('should delete the url corresponding to the id', function(done) {
    URL.retrieveURLs({})
      .then(function(urls) {
        var id = urls[0]._id;
        chai.request(app)
          .delete('/' + id)
          .end(function(err, result) {
            result.should.have.status(200);
            result.body.should.be.a('object');
            result.body.should.have.property('success').eql(true);

            if(err) done(err);
            done();
          });
      });
  });
});
