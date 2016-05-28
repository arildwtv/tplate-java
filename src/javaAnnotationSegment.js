function getValue(tplate, value) {
  return typeof value === 'function' ? value(tplate) : value;
}

function javaAnnotationWithoutParameters({ t }, name) {
  return t(`@${name}`);
}

function javaAnnotationWithParameters(tplate, name, args) {
  const { t, indent } = tplate;
  return (args.length === 1 && args[0].name === 'value'
      ? t(`@${name}(${getValue(tplate, args[0].value)})`)
      : t(
        `@${name}(`,
        indent(
          args.map(arg => `${arg.name} = ${getValue(tplate, arg.value)}`).join(',\n')
        ),
        ')'));
}

export function javaAnnotationSegment({
  name = 'Annotation',
  args = [],
  value
} = {}) {
  if (typeof value !== 'undefined' && args.length === 0) {
    args.push({ name: 'value', value });
  }

  return tplate =>
    (args.length === 0
      ? javaAnnotationWithoutParameters(tplate, name)
      : javaAnnotationWithParameters(tplate, name, args));
}
