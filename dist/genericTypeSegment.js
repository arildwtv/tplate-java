'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genericTypeSegment = genericTypeSegment;
function genericTypeSegment() {
  var genericTypes = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

  return genericTypes.length ? '<' + genericTypes.map(innerGenericTypeSegment).join(', ') + '>' : '';
}

function innerGenericTypeSegment(_ref) {
  var type = _ref.type;
  var extendsType = _ref.extendsType;
  var genericTypes = _ref.genericTypes;

  return extendsType ? type + ' extends ' + innerGenericTypeSegment(extendsType) : '' + type + genericTypeSegment(genericTypes);
}