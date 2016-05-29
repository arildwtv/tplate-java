import { annotationSegment } from './annotationSegment';
import { genericTypeSegment } from './genericTypeSegment';

function finalSegment(final) {
  return final ? 'final ' : '';
}
function parameterGenericTypeSegment(genericTypes) {
  return genericTypes.length ? genericTypeSegment(genericTypes) : '';
}

export function parameterSegment({
  name,
  type = 'String',
  genericTypes = [],
  final = true,
  annotations = [],
  afterLastParameter = ') {'
  } = {},
  { IS_LAST } = {}) {
  return ({ t }) => t(
    annotations.map(annotationSegment),
    `${finalSegment(final)}${type}${parameterGenericTypeSegment(genericTypes)} ` +
    `${name}${IS_LAST ? afterLastParameter : ','}`
  );
}
