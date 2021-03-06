import { annotationSegment } from './annotationSegment';
import { parameterSegment } from './parameterSegment';
import { genericTypeSegment } from './genericTypeSegment';
import { accessModifierSegment } from './accessModifierSegment';

function abstractSegment(abstract) {
  return abstract ? 'abstract ' : '';
}

function scopeSegment(scope) {
  return scope === 'class' ? 'static ' : '';
}

function methodGenericTypeSegment(genericTypes) {
  return genericTypes.length ? `${genericTypeSegment(genericTypes)} ` : '';
}

function methodReturnSegment(returnType) {
  return typeof returnType === 'string'
    ? returnType
    : `${returnType.type}${genericTypeSegment(returnType.genericTypes)}`;
}

function methodSignatureSegment({
  accessModifier,
  abstract,
  scope,
  genericTypes,
  returnType,
  name
  }) {
  return `${accessModifierSegment(accessModifier)}${abstractSegment(abstract)}` +
    `${scopeSegment(scope)}${methodGenericTypeSegment(genericTypes)}` +
    `${methodReturnSegment(returnType)} ${name}`;
}

function methodSegmentWithoutParameters(tplate, {
  accessModifier,
  abstract,
  inInterface,
  scope,
  genericTypes,
  returnType,
  name,
  annotations,
  body
  }) {
  const { t, indent } = tplate;
  const methodSignature = { accessModifier, abstract, scope, genericTypes, returnType, name };
  return t(
    annotations.map(annotationSegment),
    abstract || inInterface
      ? `${methodSignatureSegment(methodSignature)}();`
      : `${methodSignatureSegment(methodSignature)}() {`,
    body ? indent(body(tplate)) : undefined,
    abstract || inInterface ? undefined : '}'
  );
}

function methodSegmentWithParameters(tplate, {
  accessModifier,
  abstract,
  inInterface,
  scope,
  genericTypes,
  returnType,
  name,
  parameters,
  annotations,
  body
  }) {
  const { t, indent, map } = tplate;
  const methodSignature = { accessModifier, abstract, scope, genericTypes, returnType, name };

  const abstractAwareParameters = parameters.map(p =>
    Object.assign({}, p, {
      afterLastParameter: abstract || inInterface ? ');' : ') {'
    }));

  return t(
    annotations.map(annotationSegment),
    `${methodSignatureSegment(methodSignature)}(`,
    indent(map(abstractAwareParameters, parameterSegment)),
    body ? indent(body(tplate)) : undefined,
    abstract || inInterface ? undefined : '}'
  );
}

export function methodSegment({
  accessModifier = 'public',
  abstract = false,
  inInterface = false,
  scope = 'instance',
  genericTypes = [],
  returnType = 'void',
  name = 'method',
  parameters = [],
  annotations = [],
  body
  } = {}) {
  const args = {
    accessModifier: inInterface ? 'package' : accessModifier,
    abstract,
    inInterface,
    scope,
    genericTypes,
    returnType,
    name,
    parameters,
    annotations,
    body: abstract ? undefined : body
  };

  return tplate =>
    (parameters.length === 0
      ? methodSegmentWithoutParameters(tplate, args)
      : methodSegmentWithParameters(tplate, args));
}
