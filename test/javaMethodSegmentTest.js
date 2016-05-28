import assert from 'assert';
import { createTemplate } from 'tplate';
import { javaMethodSegment, javaStringLiteralSegment } from '../src';
import { readFixture } from './testUtil';

describe('javaMethodSegment', () => {
  it('renders default method if no arguments are provided', () => {
    const { t } = createTemplate();
    const output = t(javaMethodSegment());
    const expectedMethod = readFixture('method/defaultMethod');
    assert.equal(output, expectedMethod);
  });
  it('renders package accessed method without explicity access modifier if these arguments are provided', () => {
    const { t } = createTemplate();
    const output = t(javaMethodSegment({
      accessModifier: 'package'
    }));
    const expectedMethod = readFixture('method/defaultMethodWithPackageAccessModifier');
    assert.equal(output, expectedMethod);
  });

  it('renders method name, return type and access modifier if these arguments are provided', () => {
    const { t } = createTemplate();
    const output = t(javaMethodSegment({
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
    const output = t(javaMethodSegment({
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
    const output = t(javaMethodSegment({
      parameters: [
        {
          name: 'myString',
          type: 'String',
          final: true
        },
        {
          annotations: [
            { type: 'JsonProperty', value: javaStringLiteralSegment('myInt') },
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
    const output = t(javaMethodSegment({
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
    const output = t(javaMethodSegment({
      annotations: [
        { type: 'Override' },
        { type: 'SuppressWarnings', value: javaStringLiteralSegment('unchecked') }
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
    const output = t(javaMethodSegment({
      body: ({ t }) => t('System.out.println("Hello!");')
    }));
    const expectedMethod = readFixture('method/defaultMethodWithBody');
    assert.equal(output, expectedMethod);
  });
});
