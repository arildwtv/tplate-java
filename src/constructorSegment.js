import { annotationSegment } from './annotationSegment';
import { parameterSegment } from './parameterSegment';
import { accessModifierSegment } from './accessModifierSegment';

function constructorSegmentWithoutParameters(tplate, {
  accessModifier,
  name,
  annotations,
  body
  }) {
  const { t, indent } = tplate;
  return t(
    annotations.map(annotationSegment),
    `${accessModifierSegment(accessModifier)}${name}() {`,
    body ? indent(body(tplate)) : undefined,
    '}'
  );
}

function constructorSegmentWithParameters(tplate, {
  accessModifier,
  name,
  parameters,
  annotations,
  body
  }) {
  const { t, indent, map } = tplate;
  return t(
    annotations.map(annotationSegment),
    `${accessModifierSegment(accessModifier)}${name}(`,
    indent(map(parameters, parameterSegment)),
    body ? indent(body(tplate)) : undefined,
    '}'
  );
}

export function constructorSegment({
  accessModifier = 'public',
  name = 'MyClass',
  parameters = [],
  annotations = [],
  body
  } = {}) {
  const args = { accessModifier, name, parameters, annotations, body };
  return tplate =>
    (parameters.length === 0
      ? constructorSegmentWithoutParameters(tplate, args)
      : constructorSegmentWithParameters(tplate, args));
}
