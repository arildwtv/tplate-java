export function typePackageRemoverMiddleware(spec) {
  return removePackageInTypes(spec);
}

function removePackageInTypes(prop, key) {
  if (typeof prop === 'undefined') {
    return prop;
  }

  if (prop.constructor === Array) {
    return prop.map(item => removePackageInTypes(item));
  }

  if (typeof prop === 'object') {
    return Object.keys(prop).reduce(
      (newProp, propKey) =>
        Object.assign({}, newProp, {
          [propKey]: removePackageInTypes(prop[propKey], propKey)
        }),
      prop);
  }

  if (key === 'type') {
    return prop.match(/[^.]+$/)[0];
  }

  return prop;
}
