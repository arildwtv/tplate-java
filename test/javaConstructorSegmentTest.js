import assert from 'assert';
import { createTemplate } from 'tplate';
import { javaConstructorSegment, javaStringLiteralSegment } from '../src';
import { readFixture } from './testUtil';

describe('javaConstructorSegment', () => {
  it('renders default constructor if no arguments are provided', () => {
    const { t } = createTemplate();
    const output = t(javaConstructorSegment());
    const expectedConstructor = readFixture('constructor/defaultConstructor');
    assert.equal(output, expectedConstructor);
  });

  it('renders constructor with name and access modifier if arguments are provided', () => {
    const { t } = createTemplate();
    const output = t(javaConstructorSegment({
      accessModifier: 'private',
      name: 'ACustomPrivateConstructor'
    }));
    const expectedConstructor = readFixture('constructor/constructorWithNameAndAccessModifier');
    assert.equal(output, expectedConstructor);
  });

  it('renders package accessed constructor without explicit access modifier if these arguments are provided', () => {
    const { t } = createTemplate();
    const output = t(javaConstructorSegment({
      accessModifier: 'package'
    }));
    const expectedConstructor = readFixture('constructor/packageConstructor');
    assert.equal(output, expectedConstructor);
  });

  it('renders constructor with annotations if these arguments are provided', () => {
    const { t } = createTemplate();
    const output = t(javaConstructorSegment({
      annotations: [
        {
          type: 'MyAnnotation',
          args: [
            { name: 'val1', value: 123 },
            { name: 'val2', value: javaStringLiteralSegment('456') }
          ]
        },
        {
          type: 'MyOtherAnnotation',
          value: false
        }
      ]
    }));
    const expectedConstructor = readFixture('constructor/annotatedConstructor');
    assert.equal(output, expectedConstructor);
  });

  it('renders constructor with parameters if these arguments are provided', () => {
    const { t } = createTemplate();
    const output = t(javaConstructorSegment({
      parameters: [
        { type: 'int', name: 'aNumber' },
        { type: 'String', name: 'aString' },
        { type: 'boolean', name: 'aBoolean', final: false }
      ]
    }));
    const expectedConstructor = readFixture('constructor/constructorWithParameters');
    assert.equal(output, expectedConstructor);
  });

  it('renders constructor with annotated parameters if these arguments are provided', () => {
    const { t } = createTemplate();
    const output = t(javaConstructorSegment({
      parameters: [
        {
          annotations: [
            { type: 'JsonProperty', value: javaStringLiteralSegment("myString") },
            { type: 'AnotherAnnotation', value: 1234 }
          ],
          type: 'String',
          name: 'myString'
        },
        {
          type: 'int',
          name: 'myInt'
        }
      ]
    }));
    const expectedConstructor = readFixture('constructor/constructorWithAnnotatedParameters');
    assert.equal(output, expectedConstructor);
  });
});
