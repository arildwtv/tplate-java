"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyMiddleware = applyMiddleware;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function applyMiddleware(javaSegments) {
  for (var _len = arguments.length, middleware = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    middleware[_key - 1] = arguments[_key];
  }

  return Object.keys(javaSegments).reduce(function (middlewareSegments, segmentKey) {
    return Object.assign({}, middlewareSegments, _defineProperty({}, segmentKey, function (spec) {
      var newSpec = middleware.reduce(function (prevSpec, mid) {
        return mid(prevSpec);
      }, spec);
      var segment = javaSegments[segmentKey];
      return segment(newSpec);
    }));
  }, {});
}