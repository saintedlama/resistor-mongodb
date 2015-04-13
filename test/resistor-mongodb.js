var register = require('../');
var resistor = require('resistor');
var ObjectID = require('mongodb').ObjectID;

var expect = require('chai').expect;

describe('resistor-mongodb', function () {
  it('should register mongodb converters', function () {
    register(resistor);

    expect(resistor.converters.objectID).to.exist;
    expect(resistor.converters.ObjectID).to.exist;
  });

  it('should expose types in resistor models', function (done) {
    register(resistor);
    var middleware = resistor({ input : { type: 'objectID' }});

    var req = { body: { input: '012345678901' } };

    middleware(req, {}, function () {
      expect(req.model).to.exist;
      expect(req.model.input).to.deep.equal(new ObjectID('303132333435363738393031'));

      done();
    });
  });

  it('should not throw if validation fails', function (done) {
    register(resistor);
    var middleware = resistor({ input : { type: 'objectID' }});

    var req = { body: { input: 'thisisnotvalid' } };

    middleware(req, {}, function () {
      expect(req.model).to.deep.equal({});

      done();
    });
  })
});
