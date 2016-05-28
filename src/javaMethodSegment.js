import { javaAnnotationSegment } from './javaAnnotationSegment';
import { javaParameterSegment } from './javaParameterSegment';

function javaMethodSegmentWithoutParameters(tplate, {
  accessModifier,
  scope,
  returnType,
  name,
  annotations,
  body
  }) {
  const { t, indent } = tplate;
  return t(
    annotations.map(javaAnnotationSegment),
    `${accessModifier} ${scope === 'class' ? 'static ' : ''}${returnType} ${name}() {`,
    body ? indent(body(tplate)) : undefined,
    '}'
  );
}

function javaMethodSegmentWithParameters(tplate, {
  accessModifier,
  scope,
  returnType,
  name,
  parameters,
  annotations,
  body
  }) {
  const { t, indent, map } = tplate;
  return t(
    annotations.map(javaAnnotationSegment),
    `${accessModifier} ${scope === 'class' ? 'static ' : ''}${returnType} ${name}(`,
    indent(map(parameters, javaParameterSegment)),
    body ? indent(body(tplate)) : undefined,
    '}'
  );
}

export function javaMethodSegment({
  accessModifier = 'public',
  scope = 'instance',
  returnType = 'void',
  name = 'method',
  parameters = [],
  annotations = [],
  body
  } = {}) {
  const args = { accessModifier, scope, returnType, name, parameters, annotations, body };

  return tplate =>
    (parameters.length === 0
      ? javaMethodSegmentWithoutParameters(tplate, args)
      : javaMethodSegmentWithParameters(tplate, args));
}
