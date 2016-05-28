import assert from 'assert';
import { createTemplate } from 'tplate';
import { javaClassSegment, javaStringLiteralSegment } from '../src';
import { readFixture } from './testUtil';

describe('javaClassSegment', () => {
  it('renders default class if no arguments are provided', () => {
    const { t } = createTemplate();
    const output = t(javaClassSegment());
    const expectedClass = readFixture('class/defaultClass');
    assert.equal(output, expectedClass);
  });

  it('renders class with name if the name argument is provided', () => {
    const { t } = createTemplate();
    const output = t(javaClassSegment({
      name: 'Person'
    }));
    const expectedClass = readFixture('class/classWithName');
    assert.equal(output, expectedClass);
  });

  it('renders class with access modifier if the argument is provided', () => {
    const { t } = createTemplate();
    const output = t(javaClassSegment({
      name: 'Car',
      accessModifier: 'private'
    }));
    const expectedClass = readFixture('class/classWithAccessModifier');
    assert.equal(output, expectedClass);
  });

  it('renders package accessed class without explicit access modifier if the argument is provided', () => {
    const { t } = createTemplate();
    const output = t(javaClassSegment({
      name: 'Car',
      accessModifier: 'package'
    }));
    const expectedClass = readFixture('class/classWithPackageAccessModifier');
    assert.equal(output, expectedClass);
  });

  it('renders class with scope if the argument is provided', () => {
    const { t } = createTemplate();
    const output = t(javaClassSegment({
      name: 'Car',
      scope: 'class'
    }));
    const expectedClass = readFixture('class/classWithScope');
    assert.equal(output, expectedClass);
  });

  it('renders class with generic types if these arguments are provided', () => {
    const { t } = createTemplate();
    const output = t(javaClassSegment({
      name: 'Car',
      genericTypes: [{ type: 'String' }, { type: 'Integer' }]
    }));
    const expectedClass = readFixture('class/classWithGenericTypes');
    assert.equal(output, expectedClass);
  });

  it('renders class with implemented interface if the argument is provided', () => {
    const { t } = createTemplate();
    const output = t(javaClassSegment({
      name: 'Car',
      interfaces: [
        { name: 'CarInterface' }
      ]
    }));
    const expectedClass = readFixture('class/classImplementingInterface');
    assert.equal(output, expectedClass);
  });

  it('renders class with several implemented interfaces if the argument is provided', () => {
    const { t } = createTemplate();
    const output = t(javaClassSegment({
      name: 'Car',
      interfaces: [
        { name: 'CarInterface' },
        { name: 'AnotherInterface' },
        { name: 'AndAnotherInterface' }
      ]
    }));
    const expectedClass = readFixture('class/classImplementingInterfaces');
    assert.equal(output, expectedClass);
  });

  it('renders class with extended class if the argument is provided', () => {
    const { t } = createTemplate();
    const output = t(javaClassSegment({
      name: 'Car',
      extendsClass: {
        name: 'Vehicle'
      }
    }));
    const expectedClass = readFixture('class/classExtendingClass');
    assert.equal(output, expectedClass);
  });

  it('renders class with extended generically typed class if the argument is provided', () => {
    const { t } = createTemplate();
    const output = t(javaClassSegment({
      name: 'Car',
      extendsClass: {
        name: 'Vehicle',
        genericTypes: [{ type: 'Car' }]
      }
    }));
    const expectedClass = readFixture('class/classExtendingClassWithGenericType');
    assert.equal(output, expectedClass);
  });

  it('renders class with extended class and several implemented interfaces if the arguments are provided', () => {
    const { t } = createTemplate();
    const output = t(javaClassSegment({
      name: 'Car',
      extendsClass: {
        name: 'Vehicle'
      },
      interfaces: [
        { name: 'CarInterface' },
        { name: 'YetAnotherInterface' }
      ]
    }));
    const expectedClass = readFixture('class/classExtendingClassAndImplementingInterfaces');
    assert.equal(output, expectedClass);
  });

  it('renders class with generically typed interfaces if the arguments are provided', () => {
    const { t } = createTemplate();
    const output = t(javaClassSegment({
      name: 'Car',
      interfaces: [
        { name: 'CarInterface' },
        { name: 'VehicleInterface', genericTypes: [{ type: 'Car' }] }
      ]
    }));
    const expectedClass = readFixture('class/classImplementingInterfacesWithGenericTypes');
    assert.equal(output, expectedClass);
  });

  it('renders annotations on class if these arguments are provided', () => {
    const { t } = createTemplate();
    const output = t(javaClassSegment({
      annotations: [
        { name: 'JsonIgnoreProperties' },
        { name: 'SuppressWarnings', value: javaStringLiteralSegment('unchecked') }
      ]
    }));
    const expectedClass = readFixture('class/annotatedClass');
    assert.equal(output, expectedClass);
  });

  it('renders fields in class with names and default arguments', () => {
    const { t } = createTemplate();
    const output = t(javaClassSegment({
      fields: [
        {
          name: 'finalStringFieldWithAssignment',
          assign: javaStringLiteralSegment('A string value')
        },
        {
          accessModifier: 'package',
          name: 'nonFinalIntegerFieldWithoutAssignment',
          type: 'Integer',
          final: false,
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
    const output = t(javaClassSegment({
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
    const output = t(javaClassSegment({
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

  it('renders inner class in class if these arguments are provided', () => {
    const { t } = createTemplate();
    const output = t(javaClassSegment({
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
