import { javaAnnotationSegment } from './javaAnnotationSegment';
import { javaParameterSegment } from './javaParameterSegment';
import { javaGenericTypeSegment } from './javaGenericTypeSegment';
import { javaAccessModifierSegment } from './javaAccessModifierSegment';

function scopeSegment(scope) {
  return scope === 'class' ? 'static ' : '';
}

function methodGenericTypeSegment(genericTypes) {
  return genericTypes.length ? `${javaGenericTypeSegment(genericTypes)} ` : '';
}

function methodReturnSegment(returnType) {
  return typeof returnType === 'string'
    ? returnType
    : `${returnType.type}${javaGenericTypeSegment(returnType.genericTypes)}`;
}

function methodSignatureSegment(accessModifier, scope, genericTypes, returnType, name) {
  return `${javaAccessModifierSegment(accessModifier)}${scopeSegment(scope)}` +
    `${methodGenericTypeSegment(genericTypes)}${methodReturnSegment(returnType)} ${name}`;
}

function methodSegmentWithoutParameters(tplate, {
  accessModifier,
  scope,
  genericTypes,
  returnType,
  name,
  annotations,
  body
  }) {
  const { t, indent } = tplate;
  return t(
    annotations.map(javaAnnotationSegment),
    `${methodSignatureSegment(accessModifier, scope, genericTypes, returnType, name)}() {`,
    body ? indent(body(tplate)) : undefined,
    '}'
  );
}

function methodSegmentWithParameters(tplate, {
  accessModifier,
  scope,
  genericTypes,
  returnType,
  name,
  parameters,
  annotations,
  body
  }) {
  const { t, indent, map } = tplate;
  return t(
    annotations.map(javaAnnotationSegment),
    `${methodSignatureSegment(accessModifier, scope, genericTypes, returnType, name)}(`,
    indent(map(parameters, javaParameterSegment)),
    body ? indent(body(tplate)) : undefined,
    '}'
  );
}

export function javaMethodSegment({
  accessModifier = 'public',
  scope = 'instance',
  genericTypes = [],
  returnType = 'void',
  name = 'method',
  parameters = [],
  annotations = [],
  body
  } = {}) {
  const args = {
    accessModifier,
    scope,
    genericTypes,
    returnType,
    name,
    parameters,
    annotations,
    body
  };

  return tplate =>
    (parameters.length === 0
      ? methodSegmentWithoutParameters(tplate, args)
      : methodSegmentWithParameters(tplate, args));
}
