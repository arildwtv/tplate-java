import { javaGenericTypeSegment } from './javaGenericTypeSegment';

export function javaInterfaceImplementationSegment({ name, genericTypes = [] }) {
  return `${name}${javaGenericTypeSegment(genericTypes)}`;
}
