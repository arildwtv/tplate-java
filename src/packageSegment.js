export function packageSegment(pack) {
  return ({ t }) => t(`package ${pack};`);
}
