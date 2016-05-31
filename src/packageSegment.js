export function packageSegment(pack) {
  return ({ t }) => (pack ? t(`package ${pack};`) : '');
}
