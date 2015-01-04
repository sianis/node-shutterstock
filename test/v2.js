'use strict';

/**
 * Module dependencies.
 */

var lodash = require('lodash');
var fixtures = require('fixturefiles');
var should = require('should');
var querystring = require('querystring');

var helper = require('./helper');

/**
 * Tests
 */

describe('v2', function() {
  before(helper.beforeV2);
  beforeEach(helper.beforeEach);

  describe('image.list', function() {
    it('should return list of images', function(done) {
      var ids = ['108559295', '143051491'];

      this.nock
        .get('/v2/images?' + querystring.stringify({ id: ids }))
        .reply(200, fixtures.v2.image.list);

      this.api.image.list(ids, function(err, data) {
        should.not.exist(err);

        data.should.have.property('data');
        data.data.should.be.an.instanceof.Array;
        data.data.should.have.length(2);

        lodash.each(data.data, function(data) {
          data.should.have.keys(
            'id',
            'aspect',
            'assets',
            'contributor',
            'description',
            'image_type',
            'media_type'
          );
        });

        done();
      });
    });

    it('should return when images not found', function(done) {
      var ids = ['1'];

      this.nock
        .get('/v2/images?' + querystring.stringify({ id: ids }))
        .reply(200, { data: [] });

      this.api.image.list(ids, function(err, data) {
        should.not.exist(err);

        data.should.have.property('data');
        data.data.should.be.an.instanceof.Array;
        data.data.should.be.empty;

        done();
      });
    });
  });

  describe('image.get', function() {
    it('should return image details', function(done) {
      var imageId = '108559295';

      this.nock
        .get('/v2/images/108559295')
        .reply(200, fixtures.v2.image.get);

      this.api.image.get(imageId, function(err, data) {
        should.not.exist(err);

        data.should.have.property('id', imageId);
        data.should.have.property('keywords');
        data.should.have.property('media_type', 'image');
        data.should.have.property('categories');
        data.should.have.property('description', 'Donkey isolated on white');
        data.should.have.property('contributor');
        data.contributor.should.have.property('id', '371512');
        data.should.have.property('is_adult', false);
        data.should.have.property('image_type', 'photo');
        data.should.have.property('assets');

        done();
      });
    });

    it('should return image not found', function(done) {
      var imageId = 1;

      this.nock
        .get('/v2/images/1')
        .reply(404);

      this.api.image.get(imageId, function(err, data, res) {
        should.exist(err);

        err.message.should.equal('not found');
        res.statusCode.should.equal(404);

        should.not.exist(data);

        done();
      });
    });
  });

  describe('image.search', function() {
    it('should return all images', function(done) {
      this.nock
        .get('/v2/images/search')
        .reply(200, fixtures.v2.image.search);

      this.api.image.search(function(err, data) {
        should.not.exist(err);

        data.should.have.property('page', 1);
        data.should.have.property('per_page', 20);
        data.should.have.property('total_count');
        data.total_count.should.be.above(20);

        done();
      });
    });

    it('should return query images for donkey', function(done) {
      this.nock
        .get('/v2/images/search?query=donkey')
        .reply(200, fixtures.v2.image.search);

      this.api.image.search('donkey', function(err, data) {
        should.not.exist(err);

        data.should.have.property('page', 1);
        data.should.have.property('per_page', 20);
        data.should.have.property('total_count');
        data.total_count.should.be.above(20);

        done();
      });
    });
  });

  describe('video.list', function() {
    it('should return list of videos', function(done) {
      var ids = ['5869544', '3816467'];

      this.nock
        .get('/v2/videos?' + querystring.stringify({ id: ids }))
        .reply(200, fixtures.v2.video.list);

      this.api.video.list(ids, function(err, data) {
        should.not.exist(err);

        data.should.have.property('data');
        data.data.should.be.an.instanceof.Array;
        data.data.should.have.length(2);

        lodash.each(data.data, function(data) {
          data.should.have.keys(
            'media_type',
            'id',
            'aspect',
            'duration',
            'description',
            'contributor',
            'aspect_ratio',
            'assets'
          );
        });

        done();
      });
    });

    it('should return when videos not found', function(done) {
      var ids = ['1'];

      this.nock
        .get('/v2/videos?' + querystring.stringify({ id: ids }))
        .reply(200, { data: [] });

      this.api.video.list(ids, function(err, data) {
        should.not.exist(err);

        data.should.have.property('data');
        data.data.should.be.an.instanceof.Array;
        data.data.should.be.empty;

        done();
      });
    });
  });

  describe('video.get', function() {
    it('should return video details', function(done) {
      var videoId = '5869544';

      this.nock
        .get('/v2/videos/5869544')
        .reply(200, fixtures.v2.video.get);

      this.api.video.get(videoId, function(err, data) {
        should.not.exist(err);

        data.should.have.property('id', videoId);
        data.should.have.property('keywords');
        data.should.have.property('media_type', 'video');
        data.should.have.property('categories');
        data.should.have.property('description', 'Mae Klang Waterfall of inthanon national ' +
                                  'park, chiang mai, thailand (slow motion shot)');
        data.should.have.property('contributor');
        data.contributor.should.have.property('id', '943678');
        data.should.have.property('is_adult', false);
        data.should.have.property('assets');

        done();
      });
    });

    it('should return video not found', function(done) {
      var videoId = 1;

      this.nock
        .get('/v2/videos/1')
        .reply(404);

      this.api.video.get(videoId, function(err, data, res) {
        should.exist(err);

        err.message.should.equal('not found');
        res.statusCode.should.equal(404);

        should.not.exist(data);

        done();
      });
    });
  });

  describe('video.search', function() {
    it('should return all videos', function(done) {
      this.nock
        .get('/v2/videos/search')
        .reply(200, fixtures.v2.video.search);

      this.api.video.search(function(err, data) {
        should.not.exist(err);

        data.should.have.property('page', 1);
        data.should.have.property('per_page', 20);
        data.should.have.property('total_count');
        data.total_count.should.be.above(20);

        done();
      });
    });

    it('should return query videos for donkey', function(done) {
      this.nock
        .get('/v2/videos/search?query=donkey')
        .reply(200, fixtures.v2.video.search);

      this.api.video.search('donkey', function(err, data) {
        should.not.exist(err);

        data.should.have.property('page', 1);
        data.should.have.property('per_page', 20);
        data.should.have.property('total_count');
        data.total_count.should.be.above(20);

        done();
      });
    });
  });
});
