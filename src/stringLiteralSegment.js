export function stringLiteralSegment(str) {
  return ({ t }) => t(`"${str}"`);
}
