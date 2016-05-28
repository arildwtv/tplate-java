import { javaAnnotationSegment } from './javaAnnotationSegment';
import { javaGenericTypeSegment } from './javaGenericTypeSegment';

function finalSegment(final) {
  return final ? 'final ' : '';
}
function parameterGenericTypeSegment(genericTypes) {
  return genericTypes.length ? javaGenericTypeSegment(genericTypes) : '';
}

export function javaParameterSegment({
  name,
  type = 'String',
  genericTypes = [],
  final = true,
  annotations = []
  } = {},
  { IS_LAST } = {}) {
  return ({ t }) => t(
    annotations.map(javaAnnotationSegment),
    `${finalSegment(final)}${type}${parameterGenericTypeSegment(genericTypes)} ` +
    `${name}${IS_LAST ? ') {' : ','}`
  );
}
