'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.typePackageRemoverMiddleware = typePackageRemoverMiddleware;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function typePackageRemoverMiddleware(spec) {
  return removePackageInTypes(spec);
}

function removePackageInTypes(prop, key) {
  if (typeof prop === 'undefined') {
    return prop;
  }

  if (prop.constructor === Array) {
    return prop.map(function (item) {
      return removePackageInTypes(item);
    });
  }

  if ((typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) === 'object') {
    return Object.keys(prop).reduce(function (newProp, propKey) {
      return Object.assign({}, newProp, _defineProperty({}, propKey, removePackageInTypes(prop[propKey], propKey)));
    }, prop);
  }

  if (key === 'type') {
    return prop.match(/[^.]+$/)[0];
  }

  return prop;
}