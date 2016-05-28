import { javaAnnotationSegment } from './javaAnnotationSegment';
import { javaConstructorSegment } from './javaConstructorSegment';
import { javaFieldSegment } from './javaFieldSegment';
import { javaMethodSegment } from './javaMethodSegment';
import { javaAccessModifierSegment } from './javaAccessModifierSegment';
import { javaInterfaceImplementationSegment } from './javaInterfaceImplementationSegment';
import { interweave } from './util';

function scopeSegment(scope) {
  return scope === 'class' ? 'static ' : '';
}

function constantArgumentsSegment(args) {
  return args.join(', ');
}

function constantWithArgumentsSegment(name, args, IS_LAST) {
  return ({ t, indent }) =>
    `${args.length === 1
      ? t(`${name}(${constantArgumentsSegment(args)})`)
      : t(`${name}(`, indent(args.join(',\n')), ')')}` +
    `${IS_LAST ? ';' : ','}`;
}

function constantWithoutArgumentsSegment(name, IS_LAST) {
  return `${name}${IS_LAST ? ';' : ','}`;
}

function constantSegment({ name, args = [], annotations = [] } = {}, { IS_LAST } = {}) {
  return tplate => {
    const { t } = tplate;
    return t(
      annotations.length ? annotations.map(javaAnnotationSegment) : undefined,
      (args.length
        ? constantWithArgumentsSegment(name, args, IS_LAST)
        : constantWithoutArgumentsSegment(name, IS_LAST)));
  };
}

function enumHeaderSegment(accessModifier, scope, name) {
  return `${javaAccessModifierSegment(accessModifier)}${scopeSegment(scope)}enum ${name}`;
}

export function javaEnumSegment({
  name = 'MyEnum',
  accessModifier = 'public',
  scope = 'instance',
  interfaces = [],
  annotations = [],
  fields = [],
  constants = [],
  constructors = [],
  methods = []
  } = {}) {
  const constructorsWithName = constructors.map(c =>
    Object.assign({}, c, { name, accessModifier: 'package' }));

  return ({ t, indent, map }) => t(
    // Annotation lines
    annotations.length ? annotations.map(javaAnnotationSegment) : undefined,

    // Class Declaration
    interfaces.length
      ? enumHeaderSegment(accessModifier, scope, name)
      : `${enumHeaderSegment(accessModifier, scope, name)} {`,

    interfaces.length
      ? indent(`implements ${interfaces.map(javaInterfaceImplementationSegment).join(', ')} {`)
      : undefined,

    // Constant lines
    constants.length ? '' : undefined,
    constants.length
      ? `${indent(map(constants, constantSegment))}`
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

    '}'
  );
}
