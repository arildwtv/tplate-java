import { javaAnnotationSegment } from './javaAnnotationSegment';
import { javaConstructorSegment } from './javaConstructorSegment';
import { javaMethodSegment } from './javaMethodSegment';
import { javaFieldSegment } from './javaFieldSegment';
import { javaGenericTypeSegment } from './javaGenericTypeSegment';
import { javaAccessModifierSegment } from './javaAccessModifierSegment';
import { javaInterfaceImplementationSegment } from './javaInterfaceImplementationSegment';
import { interweave } from './util';

function classNameSegment(name, genericTypes) {
  return `${name}${javaGenericTypeSegment(genericTypes)}`;
}

function scopeSegment(scope) {
  return scope === 'class' ? 'static ' : '';
}

function extendsSegment({ type, genericTypes = [] } = {}) {
  return type
    ? ` extends ${type}${javaGenericTypeSegment(genericTypes)}`
    : '';
}

function classHeaderSegment(accessModifier, name, genericTypes, scope, extendsClass) {
  return `${javaAccessModifierSegment(accessModifier)}${scopeSegment(scope)}` +
    `class ${classNameSegment(name, genericTypes)}${extendsSegment(extendsClass)}`;
}

export function javaClassSegment({
  name = 'MyClass',
  extendsClass = undefined,
  genericTypes = [],
  accessModifier = 'public',
  scope = 'instance',
  interfaces = [],
  annotations = [],
  fields = [],
  constructors = [],
  methods = [],
  innerClasses = []
  } = {}) {
  const constructorsWithName = constructors.map(c => Object.assign({}, c, { name }));

  return ({ t, indent }) => t(
    // Annotation lines
    annotations.length ? annotations.map(javaAnnotationSegment) : undefined,

    // Class Header Declaration
    interfaces.length
      ? `${classHeaderSegment(accessModifier, name, genericTypes, scope, extendsClass)}`
      : `${classHeaderSegment(accessModifier, name, genericTypes, scope, extendsClass)} {`,

    interfaces.length
      ? indent(`implements ${interfaces.map(javaInterfaceImplementationSegment).join(', ')} {`)
      : undefined,

    // Field lines
    fields.length ? '' : undefined,
    fields.length ? indent(fields.map(javaFieldSegment)) : undefined,

    // Constructors
    constructors.length
      ? ''
      : undefined,
    constructors.length
      ? indent(interweave(constructorsWithName.map(javaConstructorSegment)))
      : undefined,

    // Methods
    methods.length
      ? ''
      : undefined,
    methods.length
      ? indent(interweave(methods.map(javaMethodSegment)))
      : undefined,

    // Inner classes
    innerClasses.length
      ? ''
      : undefined,
    innerClasses.length
      ? indent(interweave(innerClasses.map(javaClassSegment)))
      : undefined,
    '}'
  );
}
