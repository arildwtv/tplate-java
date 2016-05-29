import { javaAnnotationSegment } from './javaAnnotationSegment';
import { javaGenericTypeSegment } from './javaGenericTypeSegment';
import { javaAccessModifierSegment } from './javaAccessModifierSegment';
import { javaInterfaceImplementationSegment } from './javaInterfaceImplementationSegment';
import { interweave } from './util';
import { javaMethodSegment } from './javaMethodSegment';

function interfaceNameSegment(name, genericTypes) {
  return `${name}${javaGenericTypeSegment(genericTypes)}`;
}

function scopeSegment(scope) {
  return scope === 'class' ? 'static ' : '';
}

function extendsSegment(extendsInterfaces) {
  return extendsInterfaces.length
    ? ` extends ${extendsInterfaces.map(javaInterfaceImplementationSegment).join(', ')}`
    : '';
}

function interfaceHeaderSegment(accessModifier, name, genericTypes, scope, extendsInterfaces) {
  return `${javaAccessModifierSegment(accessModifier)}${scopeSegment(scope)}` +
    `interface ${interfaceNameSegment(name, genericTypes)}${extendsSegment(extendsInterfaces)}`;
}

export function javaInterfaceSegment({
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
    annotations.length ? annotations.map(javaAnnotationSegment) : undefined,

    // Interface Header Declaration
    `${interfaceHeaderSegment(accessModifier, name, genericTypes, scope, extendsInterfaces)} {`,

    // Methods
    interfaceMethods.length
      ? ''
      : undefined,
    interfaceMethods.length
      ? indent(interweave(interfaceMethods.map(javaMethodSegment)))
      : undefined,

    '}'
  );
}
