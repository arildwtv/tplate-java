import { genericTypeSegment } from './genericTypeSegment';

export function interfaceImplementationSegment({ type, genericTypes = [] }) {
  return `${type}${genericTypeSegment(genericTypes)}`;
}
