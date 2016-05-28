export default function getValueOrRenderSegment(tplate, value) {
  return typeof value === 'function' ? value(tplate) : value;
}
