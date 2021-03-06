import assert from 'assert';
import { createTemplate } from 'tplate';
import { interfaceSegment, stringLiteralSegment } from '../src';
import { readFixture } from './testUtil';

describe('interfaceSegment', () => {
  it('renders default interface if no arguments are provided', () => {
    const { t } = createTemplate();
    const output = t(interfaceSegment());
    const expectedInterface = readFixture('interface/defaultInterface');
    assert.equal(output, expectedInterface);
  });

  it('renders package accessed interface without explicit access modifier if this argument is provided', () => {
    const { t } = createTemplate();
    const output = t(interfaceSegment({
      accessModifier: 'package',
      name: 'VehicleInterface'
    }));
    const expectedInterface = readFixture('interface/interfaceWithPackageAccessModifier');
    assert.equal(output, expectedInterface);
  });

  it('renders interface with generic types and generic methods if these arguments are provided', () => {
    const { t } = createTemplate();
    const output = t(interfaceSegment({
      name: 'Mapper',
      genericTypes: [
        { type: 'T' },
        { type: 'U' }
      ],
      methods: [
        {
          name: 'map',
          returnType: 'U',
          parameters: [
            { name: 'input', type: 'T' }
          ]
        },
        {
          name: 'mapBack',
          returnType: 'T',
          parameters: [
            { name: 'input', type: 'U' }
          ]
        }
      ]
    }));
    const expectedInterface = readFixture('interface/interfaceWithGenericTypesAndMethods');
    assert.equal(output, expectedInterface);
  });

  it('renders statically scoped interface if this argument is provided', () => {
    const { t } = createTemplate();
    const output = t(interfaceSegment({
      scope: 'class',
      name: 'SomeStaticInterface'
    }));
    const expectedInterface = readFixture('interface/staticallyScopedInterface');
    assert.equal(output, expectedInterface);
  });

  it('renders statically scoped interface if this argument is provided', () => {
    const { t } = createTemplate();
    const output = t(interfaceSegment({
      scope: 'class',
      name: 'SomeStaticInterface'
    }));
    const expectedInterface = readFixture('interface/staticallyScopedInterface');
    assert.equal(output, expectedInterface);
  });

  it('renders annotated interface with annotated methods if these arguments are provided', () => {
    const { t } = createTemplate();
    const output = t(interfaceSegment({
      name: 'MyAnnotatedInterface',
      annotations: [
        { type: 'Deprecated' },
        { type: 'AnotherAnnotation', value: 555 }
      ],
      methods: [
        {
          name: 'oneMethod',
          annotations: [
            { type: 'OneMethodAnnotation' }
          ]
        },
        {
          name: 'anotherMethod',
          annotations: [
            {
              type: 'AnotherMethodAnnotation',
              args: [
                { name: 'awe', value: stringLiteralSegment('some') }
              ]
            }
          ],
          parameters: [
            { name: 'trueOrFalse', type: 'Boolean' }
          ]
        }
      ]
    }));
    const expectedInterface = readFixture('interface/annotatedInterfaceWithAnnotatedMethods');
    assert.equal(output, expectedInterface);
  });

  it('renders interface extending other interfaces if these arguments are provided', () => {
    const { t } = createTemplate();
    const output = t(interfaceSegment({
      name: 'SomeInterface',
      extendsInterfaces: [
        { type: 'Override' },
        { type: 'Deprecated' },
        { type: 'AnotherInterface', genericTypes: [{ type: 'T' }] }
      ]
    }));
    const expectedInterface = readFixture('interface/interfaceExtendingInterfaces');
    assert.equal(output, expectedInterface);
  });
});
