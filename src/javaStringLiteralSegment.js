export function javaStringLiteralSegment(str) {
  return ({ t }) => t(`"${str}"`);
}
