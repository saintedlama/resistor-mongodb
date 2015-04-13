var objectId;

try {
  objectId = require('mongodb').ObjectID;
} catch(e) {
  console.log('Could not require mongodb object id from mongodb driver');
}

module.exports = function(resistor) {
  if (!objectId) {
    console.log('Your trying to register mongodb converters for mongodb but I could not find a valid ObjectID type! This will fail!');
  }

  resistor.converters.objectID = converter;
  resistor.converters.ObjectID = converter;
};

function converter() {
  return function(value) {
    try {
      var result = new objectId(value);
      return result;
    } catch (e) {
      return;
    }
  }
}