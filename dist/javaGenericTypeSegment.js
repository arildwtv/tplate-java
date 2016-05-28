'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.javaGenericTypeSegment = javaGenericTypeSegment;
function javaGenericTypeSegment() {
  var genericTypes = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

  return genericTypes.length ? '<' + genericTypes.map(genericTypeSegment).join(', ') + '>' : '';
}

function genericTypeSegment(_ref) {
  var type = _ref.type;
  var extendsType = _ref.extendsType;
  var genericTypes = _ref.genericTypes;

  return extendsType ? type + ' extends ' + genericTypeSegment(extendsType) : '' + type + javaGenericTypeSegment(genericTypes);
}