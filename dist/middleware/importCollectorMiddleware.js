'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.importCollectorMiddleware = importCollectorMiddleware;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function importCollectorMiddleware(spec) {
  var imports = collectImports(spec).concat(spec && spec.imports ? spec.imports : []).filter(function (imp) {
    return spec.inPackage ? !imp.match('^' + spec.inPackage + '\\.[^.]+$') : true;
  }).filter(function (imp) {
    return !imp.match('^java\\.lang\\.[^.]+$');
  });

  var uniqueImports = [].concat(_toConsumableArray(new Set(imports))).map(function (imp) {
    return { path: imp };
  });

  return Object.assign({}, spec, { imports: uniqueImports });
}

function collectImports(prop, key) {
  if (typeof prop === 'undefined') {
    return [];
  }

  if (prop.constructor === Array) {
    return prop.reduce(function (imports, item) {
      return imports.concat(collectImports(item));
    }, []);
  }

  if ((typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) === 'object') {
    return Object.keys(prop).reduce(function (imports, propKey) {
      return imports.concat(collectImports(prop[propKey], propKey));
    }, []);
  }

  if (key === 'type') {
    return prop;
  }

  return [];
}