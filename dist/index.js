'use strict';

var _packageSegment = require('./packageSegment');

var _importSegment = require('./importSegment');

var _classSegment = require('./classSegment');

var _constructorSegment = require('./constructorSegment');

var _methodSegment = require('./methodSegment');

var _annotationSegment = require('./annotationSegment');

var _enumSegment = require('./enumSegment');

var _stringLiteralSegment = require('./stringLiteralSegment');

var _arrayLiteralSegment = require('./arrayLiteralSegment');

var _genericTypeSegment = require('./genericTypeSegment');

var _interfaceSegment = require('./interfaceSegment');

var _fileSegment = require('./fileSegment');

var _applyMiddleware = require('./applyMiddleware');

var javaSegments = {
  packageSegment: _packageSegment.packageSegment,
  importSegment: _importSegment.importSegment,
  classSegment: _classSegment.classSegment,
  constructorSegment: _constructorSegment.constructorSegment,
  methodSegment: _methodSegment.methodSegment,
  annotationSegment: _annotationSegment.annotationSegment,
  enumSegment: _enumSegment.enumSegment,
  interfaceSegment: _interfaceSegment.interfaceSegment,
  stringLiteralSegment: _stringLiteralSegment.stringLiteralSegment,
  arrayLiteralSegment: _arrayLiteralSegment.arrayLiteralSegment,
  genericTypeSegment: _genericTypeSegment.genericTypeSegment,
  fileSegment: _fileSegment.fileSegment
};

module.exports = Object.assign({}, javaSegments, {
  applyMiddleware: _applyMiddleware.applyMiddleware.bind(undefined, javaSegments)
});