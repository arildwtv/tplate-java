'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interweave = interweave;
exports.getValueOrRenderSegment = getValueOrRenderSegment;
function interweave(array) {
  var interweaveItem = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

  var interwovenArray = array.reduce(function (prevArray, item) {
    return prevArray.concat(item, interweaveItem);
  }, []);
  interwovenArray.pop();
  return interwovenArray;
}

function getValueOrRenderSegment(tplate, value) {
  return typeof value === 'function' ? value(tplate) : value;
}