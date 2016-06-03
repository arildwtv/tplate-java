import assert from 'assert';
import { createTemplate } from 'tplate';
import { classSegment, stringLiteralSegment } from '../src';
import { readFixture } from './testUtil';

describe('classSegment', () => {
  it('renders default class if no arguments are provided', () => {
    const { t } = createTemplate();
    const output = t(classSegment());
    const expectedClass = readFixture('class/defaultClass');
    assert.equal(output, expectedClass);
  });

  it('renders class with name if the name argument is provided', () => {
    const { t } = createTemplate();
    const output = t(classSegment({
      name: 'Person'
    }));
    const expectedClass = readFixture('class/classWithName');
    assert.equal(output, expectedClass);
  });

  it('renders class with access modifier if the argument is provided', () => {
    const { t } = createTemplate();
    const output = t(classSegment({
      name: 'Car',
      accessModifier: 'private'
    }));
    const expectedClass = readFixture('class/classWithAccessModifier');
    assert.equal(output, expectedClass);
  });

  it('renders package accessed class without explicit access modifier if the argument is provided', () => {
    const { t } = createTemplate();
    const output = t(classSegment({
      name: 'Car',
      accessModifier: 'package'
    }));
    const expectedClass = readFixture('class/classWithPackageAccessModifier');
    assert.equal(output, expectedClass);
  });

  it('renders class with scope if the argument is provided', () => {
    const { t } = createTemplate();
    const output = t(classSegment({
      name: 'Car',
      scope: 'class'
    }));
    const expectedClass = readFixture('class/classWithScope');
    assert.equal(output, expectedClass);
  });

  it('renders class with generic types if these arguments are provided', () => {
    const { t } = createTemplate();
    const output = t(classSegment({
      name: 'Car',
      genericTypes: [{ type: 'String' }, { type: 'Integer' }]
    }));
    const expectedClass = readFixture('class/classWithGenericTypes');
    assert.equal(output, expectedClass);
  });

  it('renders class with implemented interface if the argument is provided', () => {
    const { t } = createTemplate();
    const output = t(classSegment({
      name: 'Car',
      interfaces: [
        { type: 'CarInterface' }
      ]
    }));
    const expectedClass = readFixture('class/classImplementingInterface');
    assert.equal(output, expectedClass);
  });

  it('renders class with several implemented interfaces if the argument is provided', () => {
    const { t } = createTemplate();
    const output = t(classSegment({
      name: 'Car',
      interfaces: [
        { type: 'CarInterface' },
        { type: 'AnotherInterface' },
        { type: 'AndAnotherInterface' }
      ]
    }));
    const expectedClass = readFixture('class/classImplementingInterfaces');
    assert.equal(output, expectedClass);
  });

  it('renders class with extended class if the argument is provided', () => {
    const { t } = createTemplate();
    const output = t(classSegment({
      name: 'Car',
      extendsClass: {
        type: 'Vehicle'
      }
    }));
    const expectedClass = readFixture('class/classExtendingClass');
    assert.equal(output, expectedClass);
  });

  it('renders class with extended generically typed class if the argument is provided', () => {
    const { t } = createTemplate();
    const output = t(classSegment({
      name: 'Car',
      extendsClass: {
        type: 'Vehicle',
        genericTypes: [{ type: 'Car' }]
      }
    }));
    const expectedClass = readFixture('class/classExtendingClassWithGenericType');
    assert.equal(output, expectedClass);
  });

  it('renders class with extended class and several implemented interfaces if the arguments are provided', () => {
    const { t } = createTemplate();
    const output = t(classSegment({
      name: 'Car',
      extendsClass: {
        type: 'Vehicle'
      },
      interfaces: [
        { type: 'CarInterface' },
        { type: 'YetAnotherInterface' }
      ]
    }));
    const expectedClass = readFixture('class/classExtendingClassAndImplementingInterfaces');
    assert.equal(output, expectedClass);
  });

  it('renders class with generically typed interfaces if the arguments are provided', () => {
    const { t } = createTemplate();
    const output = t(classSegment({
      name: 'Car',
      interfaces: [
        { type: 'CarInterface' },
        { type: 'VehicleInterface', genericTypes: [{ type: 'Car' }] }
      ]
    }));
    const expectedClass = readFixture('class/classImplementingInterfacesWithGenericTypes');
    assert.equal(output, expectedClass);
  });

  it('renders annotations on class if these arguments are provided', () => {
    const { t } = createTemplate();
    const output = t(classSegment({
      annotations: [
        { type: 'JsonIgnoreProperties' },
        { type: 'SuppressWarnings', value: stringLiteralSegment('unchecked') }
      ]
    }));
    const expectedClass = readFixture('class/annotatedClass');
    assert.equal(output, expectedClass);
  });

  it('renders fields in class with names and default arguments', () => {
    const { t } = createTemplate();
    const output = t(classSegment({
      fields: [
        {
          name: 'finalStringFieldWithAssignment',
          assign: stringLiteralSegment('A string value')
        },
        {
          accessModifier: 'package',
          name: 'nonFinalIntegerFieldWithoutAssignment',
          type: 'Integer',
          final: false
        },
        {
          accessModifier: 'public',
          name: 'publicBooleanListListField',
          type: 'List',
          genericTypes: [
            { type: 'List', genericTypes: [{ type: 'Boolean' }] }
          ]
        }
      ]
    }));
    const expectedClass = readFixture('class/classWithFields');
    assert.equal(output, expectedClass);
  });

  it('renders fields and constructors in class if these arguments are provided', () => {
    const { t } = createTemplate();
    const output = t(classSegment({
      name: 'Person',
      fields: [
        { name: 'firstName' },
        { name: 'lastName' },
        { name: 'age', type: 'int' }
      ],
      constructors: [
        {
          parameters: [
            { name: 'firstName' },
            { name: 'lastName' },
            { name: 'age', type: 'int' }
          ]
        },
        {
          parameters: [
            { name: 'firstName' },
            { name: 'lastName' },
          ]
        },
        {}
      ]
    }));
    const expectedClass = readFixture('class/classWithFieldsAndConstructors');
    assert.equal(output, expectedClass);
  });

  it('renders fields, constructors and methods in class if these arguments are provided', () => {
    const { t } = createTemplate();
    const output = t(classSegment({
      name: 'Person',
      fields: [
        { name: 'firstName' }
      ],
      constructors: [
        {
          parameters: [
            { name: 'firstName' }
          ],
          body: ({ t }) => t('this.firstName = firstName;')
        }
      ],
      methods: [
        {
          name: 'getFirstName',
          returnType: 'String',
          body: ({ t }) => t('return firstName;')
        },
        {
          name: 'printFirstName',
          body: ({ t }) => t('System.out.println(firstName);')
        },
        {
          name: 'createVikram',
          scope: 'class',
          returnType: 'Person',
          body: ({ t }) => t('return new Person("Vikram");')
        }
      ]
    }));
    const expectedClass = readFixture('class/classWithFieldsAndConstructorsAndMethods');
    assert.equal(output, expectedClass);
  });

  it('renders annotated fields, constructors and methods in class if these arguments are provided', () => {
    const { t } = createTemplate();
    const output = t(classSegment({
      name: 'Person',
      fields: [
        { name: 'name', annotations: [{ type: 'Deprecated' }] },
        { name: 'lastName' }
      ]
    }));
    const expectedClass = readFixture('class/classWithAnnotatedFields');
    assert.equal(output, expectedClass);
  });

  it('renders inner class in class if these arguments are provided', () => {
    const { t } = createTemplate();
    const output = t(classSegment({
      name: 'Person',
      methods: [
        {
          name: 'printWhatever',
          returnType: 'void'
        }
      ],
      innerClasses: [
        {
          name: 'Gender',
          scope: 'class',
          fields: [
            { name: 'gender' }
          ]
        }
      ]
    }));
    const expectedClass = readFixture('class/classWithInnerClass');
    assert.equal(output, expectedClass);
  });
});
