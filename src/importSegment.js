function staticImportSegment(staticImport) {
  return staticImport ? 'static ' : '';
}

export function importSegment({
  staticImport = false,
  path
  } = {}) {
  return ({ t }) => t(`import ${staticImportSegment(staticImport)}${path};`);
}
