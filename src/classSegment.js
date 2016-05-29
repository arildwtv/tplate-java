import { annotationSegment } from './annotationSegment';
import { constructorSegment } from './constructorSegment';
import { methodSegment } from './methodSegment';
import { fieldSegment } from './fieldSegment';
import { genericTypeSegment } from './genericTypeSegment';
import { accessModifierSegment } from './accessModifierSegment';
import { interfaceImplementationSegment } from './interfaceImplementationSegment';
import { interweave } from './util';

function classNameSegment(name, genericTypes) {
  return `${name}${genericTypeSegment(genericTypes)}`;
}

function scopeSegment(scope) {
  return scope === 'class' ? 'static ' : '';
}

function extendsSegment({ type, genericTypes = [] } = {}) {
  return type
    ? ` extends ${type}${genericTypeSegment(genericTypes)}`
    : '';
}

function classHeaderSegment(accessModifier, name, genericTypes, scope, extendsClass) {
  return `${accessModifierSegment(accessModifier)}${scopeSegment(scope)}` +
    `class ${classNameSegment(name, genericTypes)}${extendsSegment(extendsClass)}`;
}

export function classSegment({
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
    annotations.length ? annotations.map(annotationSegment) : undefined,

    // Class Header Declaration
    interfaces.length
      ? `${classHeaderSegment(accessModifier, name, genericTypes, scope, extendsClass)}`
      : `${classHeaderSegment(accessModifier, name, genericTypes, scope, extendsClass)} {`,

    interfaces.length
      ? indent(`implements ${interfaces.map(interfaceImplementationSegment).join(', ')} {`)
      : undefined,

    // Field lines
    fields.length ? '' : undefined,
    fields.length ? indent(fields.map(fieldSegment)) : undefined,

    // Constructors
    constructors.length
      ? ''
      : undefined,
    constructors.length
      ? indent(interweave(constructorsWithName.map(constructorSegment)))
      : undefined,

    // Methods
    methods.length
      ? ''
      : undefined,
    methods.length
      ? indent(interweave(methods.map(methodSegment)))
      : undefined,

    // Inner classes
    innerClasses.length
      ? ''
      : undefined,
    innerClasses.length
      ? indent(interweave(innerClasses.map(classSegment)))
      : undefined,
    '}'
  );
}
