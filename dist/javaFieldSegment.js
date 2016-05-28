'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.javaFieldSegment = javaFieldSegment;

var _javaGenericTypeSegment = require('./javaGenericTypeSegment');

var _util = require('./util');

var _javaAccessModifierSegment = require('./javaAccessModifierSegment');

function javaFieldSegment() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref$accessModifier = _ref.accessModifier;
  var accessModifier = _ref$accessModifier === undefined ? 'private' : _ref$accessModifier;
  var _ref$scope = _ref.scope;
  var scope = _ref$scope === undefined ? 'instance' : _ref$scope;
  var _ref$final = _ref.final;
  var final = _ref$final === undefined ? true : _ref$final;
  var _ref$type = _ref.type;
  var type = _ref$type === undefined ? 'String' : _ref$type;
  var _ref$genericTypes = _ref.genericTypes;
  var genericTypes = _ref$genericTypes === undefined ? [] : _ref$genericTypes;
  var name = _ref.name;
  var assign = _ref.assign;

  var scopeString = scope === 'class' ? 'static ' : '';
  var finalString = final ? 'final ' : '';
  return function (tplate) {
    var t = tplate.t;

    var assignString = assign ? ' = ' + (0, _util.getValueOrRenderSegment)(tplate, assign) : '';
    return t('' + (0, _javaAccessModifierSegment.javaAccessModifierSegment)(accessModifier) + scopeString + finalString + ('' + type + (0, _javaGenericTypeSegment.javaGenericTypeSegment)(genericTypes) + ' ' + name + assignString + ';'));
  };
}