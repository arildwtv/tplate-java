import assert from 'assert';
import { createTemplate } from 'tplate';
import { enumSegment, stringLiteralSegment } from '../src';
import { readFixture } from './testUtil';

describe('enumSegment', () => {
  it('renders default enum if no arguments are provided', () => {
    const { t } = createTemplate();
    const output = t(enumSegment());
    const expectedEnum = readFixture('enum/defaultEnum');
    assert.equal(output, expectedEnum);
  });

  it('renders package accessed enum without explicit access modifier if these arguments are provided', () => {
    const { t } = createTemplate();
    const output = t(enumSegment({
      accessModifier: 'package'
    }));
    const expectedEnum = readFixture('enum/defaultEnumWithPackageAccessModifier');
    assert.equal(output, expectedEnum);
  });

  it('renders enum with private access and static scope if these arguments are provided', () => {
    const { t } = createTemplate();
    const output = t(enumSegment({
      accessModifier: 'private',
      scope: 'class',
      name: 'SomeEnum'
    }));
    const expectedEnum = readFixture('enum/privateStaticEnum');
    assert.equal(output, expectedEnum);
  });

  it('renders enum with implementing interfaces if no arguments are provided', () => {
    const { t } = createTemplate();
    const output = t(enumSegment({
      interfaces: [
        { type: 'SomeInterface' },
        { type: 'AndAnotherInterface' }
      ]
    }));
    const expectedEnum = readFixture('enum/enumImplementingInterface');
    assert.equal(output, expectedEnum);
  });

  it('renders enum with constants if these arguments are provided', () => {
    const { t } = createTemplate();
    const output = t(enumSegment({
      name: 'Weekdays',
      constants: [
        { name: 'MONDAY' },
        { name: 'TUESDAY' },
        { name: 'WEDNESDAY' },
        { name: 'THURSDAY' },
        { name: 'FRIDAY' }
      ]
    }));
    const expectedEnum = readFixture('enum/enumWithConstants');
    assert.equal(output, expectedEnum);
  });

  it('renders annotated enum with annotated constants if these arguments are provided', () => {
    const { t } = createTemplate();
    const output = t(enumSegment({
      name: 'Weekdays',
      annotations: [
        { type: 'WeekdayAnnotation' }
      ],
      constants: [
        {
          name: 'MONDAY',
          annotations: [
            { type: 'FirstDay' }
          ]
        },
        { name: 'TUESDAY' },
        { name: 'WEDNESDAY' },
        { name: 'THURSDAY' },
        {
          name: 'FRIDAY',
          annotations: [
            { type: 'LastDay' },
            { type: 'HappyDay', value: stringLiteralSegment('Yay!') }
          ]
        }
      ]
    }));
    const expectedEnum = readFixture('enum/annotatedEnumWithAnnotatedConstants');
    assert.equal(output, expectedEnum);
  });

  it('renders enum with constants of a primitive type if these arguments are provided', () => {
    const { t } = createTemplate();
    const output = t(enumSegment({
      name: 'Weekdays',
      constants: [
        { name: 'MONDAY', args: [1] },
        { name: 'TUESDAY', args: [2] },
        { name: 'WEDNESDAY', args: [3] },
        { name: 'THURSDAY', args: [4] },
        { name: 'FRIDAY', args: [5] }
      ],
      fields: [
        { name: 'dayNumber', type: 'int' }
      ],
      constructors: [
        {
          parameters: [{ name: 'dayNumber', type: 'int' }],
          body: ({ t }) => t('this.dayNumber = dayNumber;')
        }
      ],
      methods: [
        {
          name: 'getDayNumber',
          returnType: 'int',
          body: ({ t }) => t('return dayNumber;')
        }
      ]
    }));
    const expectedEnum = readFixture('enum/enumWithPrimitiveConstants');
    assert.equal(output, expectedEnum);
  });

  it('renders enum with constants of objects if these arguments are provided', () => {
    const { t } = createTemplate();
    const output = t(enumSegment({
      name: 'StarWarsCast',
      constants: [
        {
          name: 'LUKE',
          args: [
            `new Character("Luke")`,
            'Gender.MALE'
          ]
        },
        {
          name: 'LEIA',
          args: [
            `new Character("Leia")`,
            'Gender.FEMALE'
          ]
        }
      ],
      fields: [
        { name: 'character', type: 'Character' },
        { name: 'gender', type: 'Gender' }
      ],
      constructors: [
        {
          parameters: [
            { name: 'character', type: 'Character' },
            { name: 'gender', type: 'Gender' }
          ],
          body: ({ t }) => t(
            'this.character = character;',
            'this.gender = gender;'
          )
        }
      ],
    }));
    const expectedEnum = readFixture('enum/enumWithConstantsOfObjects');
    assert.equal(output, expectedEnum);
  });
});
