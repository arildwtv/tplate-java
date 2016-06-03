'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.importSegment = importSegment;
function staticImportSegment(staticImport) {
  return staticImport ? 'static ' : '';
}

function importSegment() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref$staticImport = _ref.staticImport;
  var staticImport = _ref$staticImport === undefined ? false : _ref$staticImport;
  var path = _ref.path;

  return function (_ref2) {
    var t = _ref2.t;
    return t('import ' + staticImportSegment(staticImport) + path + ';');
  };
}