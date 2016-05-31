import { packageSegment } from './packageSegment';
import { importSegment } from './importSegment';
import { enumSegment } from './enumSegment';
import { interfaceSegment } from './interfaceSegment';
import { classSegment } from './classSegment';

export function fileSegment({
  inPackage,
  imports = [],
  javaClass,
  javaEnum,
  javaInterface
  } = {}) {
  return ({ t }) => t(
    inPackage ? packageSegment(inPackage) : undefined,
    inPackage ? '' : undefined,
    imports.length ? imports.map(importSegment) : undefined,
    imports.length ? '' : undefined,
    javaEnum ? enumSegment(javaEnum) : undefined,
    javaInterface ? interfaceSegment(javaInterface) : undefined,
    !javaEnum && !javaInterface ? classSegment(javaClass) : undefined,
    ''
  );
}
