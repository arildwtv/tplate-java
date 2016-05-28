import { javaGenericTypeSegment } from './javaGenericTypeSegment';

export function javaInterfaceImplementationSegment({ type, genericTypes = [] }) {
  return `${type}${javaGenericTypeSegment(genericTypes)}`;
}
