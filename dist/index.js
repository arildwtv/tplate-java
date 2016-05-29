'use strict';

var _javaClassSegment = require('./javaClassSegment');

var _javaConstructorSegment = require('./javaConstructorSegment');

var _javaMethodSegment = require('./javaMethodSegment');

var _javaAnnotationSegment = require('./javaAnnotationSegment');

var _javaEnumSegment = require('./javaEnumSegment');

var _javaStringLiteralSegment = require('./javaStringLiteralSegment');

var _javaArrayLiteralSegment = require('./javaArrayLiteralSegment');

var _javaGenericTypeSegment = require('./javaGenericTypeSegment');

var _javaInterfaceSegment = require('./javaInterfaceSegment');

module.exports = {
  javaClassSegment: _javaClassSegment.javaClassSegment,
  javaConstructorSegment: _javaConstructorSegment.javaConstructorSegment,
  javaMethodSegment: _javaMethodSegment.javaMethodSegment,
  javaAnnotationSegment: _javaAnnotationSegment.javaAnnotationSegment,
  javaEnumSegment: _javaEnumSegment.javaEnumSegment,
  javaInterfaceSegment: _javaInterfaceSegment.javaInterfaceSegment,
  javaStringLiteralSegment: _javaStringLiteralSegment.javaStringLiteralSegment,
  javaArrayLiteralSegment: _javaArrayLiteralSegment.javaArrayLiteralSegment,
  javaGenericTypeSegment: _javaGenericTypeSegment.javaGenericTypeSegment
};