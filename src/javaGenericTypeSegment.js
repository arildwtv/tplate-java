export function javaGenericTypeSegment(genericTypes = []) {
  return genericTypes.length
    ? `<${genericTypes.map(genericTypeSegment).join(', ')}>`
    : '';
}

function genericTypeSegment({ type, extendsType, genericTypes }) {
  return extendsType
    ? `${type} extends ${genericTypeSegment(extendsType)}`
    : `${type}${javaGenericTypeSegment(genericTypes)}`;
}
