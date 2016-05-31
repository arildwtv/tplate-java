'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.packageSegment = packageSegment;
function packageSegment(pack) {
  return function (_ref) {
    var t = _ref.t;
    return pack ? t('package ' + pack + ';') : '';
  };
}