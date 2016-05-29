function staticImportSegment(staticImport) {
  return staticImport ? 'static ' : '';
}

export function importSegment({
  staticImport = false,
  type
  } = {}) {
  return ({ t }) => t(`import ${staticImportSegment(staticImport)}${type};`);
}
