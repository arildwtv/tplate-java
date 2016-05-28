export function javaArrayLiteralSegment(array) {
  return tplate => {
    const { t, indent } = tplate;
    return t(
      '{',
      indent(
        array.map(item => (typeof item === 'function' ? item(tplate) : item)).join(',\n')
      ),
      '}');
  };
}
