import { annotationSegment } from './annotationSegment';
import { genericTypeSegment } from './genericTypeSegment';
import { accessModifierSegment } from './accessModifierSegment';
import { interfaceImplementationSegment } from './interfaceImplementationSegment';
import { interweave } from './util';
import { methodSegment } from './methodSegment';

function interfaceNameSegment(name, genericTypes) {
  return `${name}${genericTypeSegment(genericTypes)}`;
}

function scopeSegment(scope) {
  return scope === 'class' ? 'static ' : '';
}

function extendsSegment(extendsInterfaces) {
  return extendsInterfaces.length
    ? ` extends ${extendsInterfaces.map(interfaceImplementationSegment).join(', ')}`
    : '';
}

function interfaceHeaderSegment(accessModifier, name, genericTypes, scope, extendsInterfaces) {
  return `${accessModifierSegment(accessModifier)}${scopeSegment(scope)}` +
    `interface ${interfaceNameSegment(name, genericTypes)}${extendsSegment(extendsInterfaces)}`;
}

export function interfaceSegment({
  name = 'MyInterface',
  extendsInterfaces = [],
  genericTypes = [],
  accessModifier = 'public',
  scope = 'instance',
  annotations = [],
  methods = []
  } = {}) {
  const interfaceMethods = methods.map(m =>
    Object.assign(
      {},
      m,
      {
        accessModifier: 'package',
        inInterface: true
      }));

  return ({ t, indent }) => t(
    // Annotation lines
    annotations.length ? annotations.map(annotationSegment) : undefined,

    // Interface Header Declaration
    `${interfaceHeaderSegment(accessModifier, name, genericTypes, scope, extendsInterfaces)} {`,

    // Methods
    interfaceMethods.length
      ? ''
      : undefined,
    interfaceMethods.length
      ? indent(interweave(interfaceMethods.map(methodSegment)))
      : undefined,

    '}'
  );
}
