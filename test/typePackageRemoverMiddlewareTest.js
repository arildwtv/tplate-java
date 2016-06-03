import assert from 'assert';
import { typePackageRemoverMiddleware } from '../src/middleware/typePackageRemoverMiddleware';

describe('getPackageRemoverMiddleware', () => {
  it('returns same spec if spec is undefined', () => {
    assert.deepEqual(undefined, typePackageRemoverMiddleware());
  });

  it('returns spec without package in type if spec is an object', () => {
    const spec = typePackageRemoverMiddleware({ type: 'java.util.List' });

    const expectedSpec = { type: 'List' };

    assert.deepEqual(expectedSpec, spec);
  });

  it('returns spec without package in types if spec is an array of objects', () => {
    const spec = typePackageRemoverMiddleware([
      { type: 'java.util.List', foo: 'bar' },
      { type: 'java.util.Date', bar: 'baz' },
      { type: 'java.util.ArrayList' }
    ]);

    const expectedSpec = [
      { type: 'List', foo: 'bar' },
      { type: 'Date', bar: 'baz' },
      { type: 'ArrayList' }
    ];

    assert.deepEqual(expectedSpec, spec);
  });

  it('returns spec without package in types even if spec is deeply nested objects', () => {
    const spec = typePackageRemoverMiddleware([
      {
        type: 'java.util.List',
        nested: {
          type: 'java.math.BigDecimal',
          nestedAgain: [
            { type: 'java.util.HashMap' }
          ]
        }
      },
      { type: 'java.util.Date' },
      { type: 'java.util.ArrayList' }
    ]);

    const expectedSpec = [
      {
        type: 'List',
        nested: {
          type: 'BigDecimal',
          nestedAgain: [
            { type: 'HashMap' }
          ]
        }
      },
      { type: 'Date' },
      { type: 'ArrayList' }
    ];

    assert.deepEqual(expectedSpec, spec);
  });
});