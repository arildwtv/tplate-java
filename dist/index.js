'use strict';

var _classSegment = require('./classSegment');

var _constructorSegment = require('./constructorSegment');

var _methodSegment = require('./methodSegment');

var _annotationSegment = require('./annotationSegment');

var _enumSegment = require('./enumSegment');

var _stringLiteralSegment = require('./stringLiteralSegment');

var _arrayLiteralSegment = require('./arrayLiteralSegment');

var _genericTypeSegment = require('./genericTypeSegment');

var _interfaceSegment = require('./interfaceSegment');

module.exports = {
  classSegment: _classSegment.classSegment,
  constructorSegment: _constructorSegment.constructorSegment,
  methodSegment: _methodSegment.methodSegment,
  annotationSegment: _annotationSegment.annotationSegment,
  enumSegment: _enumSegment.enumSegment,
  interfaceSegment: _interfaceSegment.interfaceSegment,
  stringLiteralSegment: _stringLiteralSegment.stringLiteralSegment,
  arrayLiteralSegment: _arrayLiteralSegment.arrayLiteralSegment,
  genericTypeSegment: _genericTypeSegment.genericTypeSegment
};