"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stringLiteralSegment = stringLiteralSegment;
function stringLiteralSegment(str) {
  return function (_ref) {
    var t = _ref.t;
    return t("\"" + str + "\"");
  };
}