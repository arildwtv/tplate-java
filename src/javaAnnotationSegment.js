function getValue(tplate, value) {
  return typeof value === 'function' ? value(tplate) : value;
}

function javaAnnotationWithoutParameters({ t }, type) {
  return t(`@${type}`);
}

function javaAnnotationWithParameters(tplate, type, args) {
  const { t, indent } = tplate;
  return (args.length === 1 && args[0].name === 'value'
      ? t(`@${type}(${getValue(tplate, args[0].value)})`)
      : t(
        `@${type}(`,
        indent(
          args.map(arg => `${arg.name} = ${getValue(tplate, arg.value)}`).join(',\n')
        ),
        ')'));
}

export function javaAnnotationSegment({
  type = 'Annotation',
  args = [],
  value
} = {}) {
  if (typeof value !== 'undefined' && args.length === 0) {
    args.push({ name: 'value', value });
  }

  return tplate =>
    (args.length === 0
      ? javaAnnotationWithoutParameters(tplate, type)
      : javaAnnotationWithParameters(tplate, type, args));
}
