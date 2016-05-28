"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.javaStringLiteralSegment = javaStringLiteralSegment;
function javaStringLiteralSegment(str) {
  return function (_ref) {
    var t = _ref.t;
    return t("\"" + str + "\"");
  };
}