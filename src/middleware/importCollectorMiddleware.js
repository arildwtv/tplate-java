export function importCollectorMiddleware(spec) {
  const imports = collectImports(spec)
    .concat(spec && spec.imports ? spec.imports : [])
    .filter(imp => (spec.inPackage ? !imp.match(`^${spec.inPackage}\\.[^.]+$`) : true))
    .filter(imp => !imp.match('^java\\.lang\\.[^.]+$'));

  const uniqueImports = [...new Set(imports)]
    .map(imp => ({ path: imp }));

  return Object.assign({}, spec, { imports: uniqueImports });
}

function collectImports(prop, key) {
  if (typeof prop === 'undefined') {
    return [];
  }

  if (prop.constructor === Array) {
    return prop.reduce((imports, item) =>
      imports.concat(collectImports(item)), []);
  }

  if (typeof prop === 'object') {
    return Object.keys(prop).reduce(
      (imports, propKey) =>
        imports.concat(collectImports(prop[propKey], propKey)),
      []);
  }

  if (key === 'type') {
    return prop;
  }

  return [];
}
