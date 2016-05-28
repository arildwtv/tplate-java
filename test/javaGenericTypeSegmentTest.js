import assert from 'assert';
import { javaGenericTypeSegment } from '../src';

describe('javaGenericTypeSegment', () => {
  it('renders no generic type if no arguments are provided', () => {
    const output = javaGenericTypeSegment();
    assert.equal(output, '');
  });

  it('renders generic type if a generic type is provided', () => {
    const output = javaGenericTypeSegment([
      { type: 'Boolean' }
    ]);
    assert.equal(output, '<Boolean>');
  });

  it('renders generic types if more than one generic type is provided', () => {
    const output = javaGenericTypeSegment([
      { type: 'Integer' },
      { type: 'String' }
    ]);
    assert.equal(output, '<Integer, String>');
  });

  it('renders generic type with extends bound if the argument is provided', () => {
    const output = javaGenericTypeSegment([
      { type: 'K', extendsType: { type: 'Integer' } },
      { type: 'V', extendsType: { type: 'List', genericTypes: [{ type: 'T' }]}}
    ]);
    assert.equal(output, '<K extends Integer, V extends List<T>>');
  });

  it('renders nested generic types if these arguments are provided', () => {
    const output = javaGenericTypeSegment([
      {
        type: 'Void'
      },
      {
        type: 'Map',
        genericTypes: [
          { type: 'Integer' },
          { type: 'String' }
        ]
      }
    ]);
    assert.equal(output, '<Void, Map<Integer, String>>');
  });

});
