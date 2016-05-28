import { javaAnnotationSegment } from './javaAnnotationSegment';
import { javaParameterSegment } from './javaParameterSegment';
import { javaAccessModifierSegment } from './javaAccessModifierSegment';

function javaConstructorSegmentWithoutParameters(tplate, {
  accessModifier,
  name,
  annotations,
  body
  }) {
  const { t, indent } = tplate;
  return t(
    annotations.map(javaAnnotationSegment),
    `${javaAccessModifierSegment(accessModifier)}${name}() {`,
    body ? indent(body(tplate)) : undefined,
    '}'
  );
}

function javaConstructorSegmentWithParameters(tplate, {
  accessModifier,
  name,
  parameters,
  annotations,
  body
  }) {
  const { t, indent, map } = tplate;
  return t(
    annotations.map(javaAnnotationSegment),
    `${javaAccessModifierSegment(accessModifier)}${name}(`,
    indent(map(parameters, javaParameterSegment)),
    body ? indent(body(tplate)) : undefined,
    '}'
  );
}

export function javaConstructorSegment({
  accessModifier = 'public',
  name = 'MyClass',
  parameters = [],
  annotations = [],
  body
  } = {}) {
  const args = { accessModifier, name, parameters, annotations, body };
  return tplate =>
    (parameters.length === 0
      ? javaConstructorSegmentWithoutParameters(tplate, args)
      : javaConstructorSegmentWithParameters(tplate, args));
}
