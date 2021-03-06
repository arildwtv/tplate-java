import assert from 'assert';
import { createTemplate } from 'tplate';
import { methodSegment, stringLiteralSegment } from '../src';
import { readFixture } from './testUtil';

describe('methodSegment', () => {
  it('renders default method if no arguments are provided', () => {
    const { t } = createTemplate();
    const output = t(methodSegment());
    const expectedMethod = readFixture('method/defaultMethod');
    assert.equal(output, expectedMethod);
  });

  it('renders package accessed method without explicity access modifier if these arguments are provided', () => {
    const { t } = createTemplate();
    const output = t(methodSegment({
      accessModifier: 'package'
    }));
    const expectedMethod = readFixture('method/defaultMethodWithPackageAccessModifier');
    assert.equal(output, expectedMethod);
  });

  it('renders method name, return type and access modifier if these arguments are provided', () => {
    const { t } = createTemplate();
    const output = t(methodSegment({
      accessModifier: 'protected',
      scope: 'class',
      name: 'getStringProperty',
      returnType: 'String'
    }));
    const expectedMethod = readFixture('method/methodWithNameScopeReturnTypeAndAccessModifier');
    assert.equal(output, expectedMethod);
  });

  it('renders parameters if these arguments are provided', () => {
    const { t } = createTemplate();
    const output = t(methodSegment({
      parameters: [
        { name: 'myString', type: 'String' },
        { name: 'myInt', type: 'int' },
        { name: 'myBool', type: 'boolean', final: false }
      ]
    }));
    const expectedMethod = readFixture('method/defaultMethodWithParameters');
    assert.equal(output, expectedMethod);
  });

  it('renders parameters with annotations if these arguments are provided', () => {
    const { t } = createTemplate();
    const output = t(methodSegment({
      parameters: [
        {
          name: 'myString',
          type: 'String',
          final: true
        },
        {
          annotations: [
            { type: 'JsonProperty', value: stringLiteralSegment('myInt') },
            { type: 'Default', value: 1234 }
          ],
          name: 'myInt',
          type: 'int',
          final: true
        }
      ]
    }));
    const expectedMethod = readFixture('method/defaultMethodWithAnnotatedParameters');
    assert.equal(output, expectedMethod);
  });

  it('renders generically typed method if these arguments are provided', () => {
    const { t } = createTemplate();
    const output = t(methodSegment({
      name: 'getRandomVehiclesFromList',
      returnType: { type: 'List', genericTypes: [{ type: 'T' }] },
      genericTypes: [{ type: 'T', extendsType: { type: 'Vehicle' }}],
      parameters: [
        {
          name: 'vehicleList',
          type: 'List',
          genericTypes: [{ type: 'T' }]
        }
      ]
    }));
    const expectedMethod =
      readFixture('method/genericallyTypedMethodWithParametersAndGenericTypes');
    assert.equal(output, expectedMethod);
  });

  it('renders annotations on method if these arguments are provided', () => {
    const { t } = createTemplate();
    const output = t(methodSegment({
      annotations: [
        { type: 'Override' },
        { type: 'SuppressWarnings', value: stringLiteralSegment('unchecked') }
      ],
      name: 'setPerson',
      parameters: [
        {
          name: 'name',
          type: 'String',
          final: true
        },
        {
          name: 'age',
          type: 'int',
          final: true
        }
      ]
    }));
    const expectedMethod = readFixture('method/annotatedMethod');
    assert.equal(output, expectedMethod);
  });

  it('renders method body if argument is provided', () => {
    const { t } = createTemplate();
    const output = t(methodSegment({
      body: ({ t }) => t('System.out.println("Hello!");')
    }));
    const expectedMethod = readFixture('method/defaultMethodWithBody');
    assert.equal(output, expectedMethod);
  });

  it('renders abstract method if the argument is provided', () => {
    const { t } = createTemplate();
    const output = t(methodSegment({
      abstract: true
    }));
    const expectedMethod = readFixture('method/abstractMethod');
    assert.equal(output, expectedMethod);
  });

  it('renders abstract method without body even if the body argument is provided', () => {
    const { t } = createTemplate();
    const output = t(methodSegment({
      abstract: true,
      parameters: [
        { name: 'myString', type: 'String' },
        { name: 'myInt', type: 'int' }
      ],
      body: ({ t }) => t('Should.not.be.rendered();')
    }));
    const expectedMethod = readFixture('method/abstractMethodWithParameters');
    assert.equal(output, expectedMethod);
  });

  it('renders interface method if the argument is provided', () => {
    const { t } = createTemplate();
    const output = t(methodSegment({
      inInterface: true
    }));
    const expectedMethod = readFixture('method/interfaceMethod');
    assert.equal(output, expectedMethod);
  });

  it('renders interface method without body even if the body argument is provided', () => {
    const { t } = createTemplate();
    const output = t(methodSegment({
      inInterface: true,
      name: 'aMethodWithPeople',
      parameters: [
        { name: 'people', type: 'List', genericTypes: [{ type: 'Person' }]},
        { name: 'person', type: 'Person' }
      ]
    }));
    const expectedMethod = readFixture('method/interfaceMethodWithParameters');
    assert.equal(output, expectedMethod);
  });
});
