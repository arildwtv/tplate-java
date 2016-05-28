import { javaAnnotationSegment } from './javaAnnotationSegment';

export function javaParameterSegment({
  name,
  type = 'String',
  final = true,
  annotations = []
  } = {},
  { IS_LAST } = {}) {
  return ({ t }) => t(
    annotations.map(javaAnnotationSegment),
    `${final ? 'final ' : ''}${type} ${name}${IS_LAST ? ') {' : ','}`
  );
}
