import assert from 'assert';
import { importCollectorMiddleware } from '../src/middleware/importCollectorMiddleware';

describe('importCollectorMiddleware', () => {
  it('returns no imports if spec is empty', () => {
    const { imports } = importCollectorMiddleware();

    assert.deepEqual([], imports);
  });

  it('returns type in object as import', () => {
    const { imports } = importCollectorMiddleware({ type: 'java.util.List' });

    assert.deepEqual([{ path: 'java.util.List' }], imports);
  });

  it('concatenates types with spec "imports" property if the property exists', () => {
    const { imports } = importCollectorMiddleware({
      type: 'java.util.List',
      imports: ['my.packaged.MyClass']
    });

    assert.deepEqual([
      { path: 'java.util.List' },
      { path: 'my.packaged.MyClass' }
    ], imports);
  });

  it('returns types in object array as imports', () => {
    const { imports } = importCollectorMiddleware([
      { type: 'java.util.List', foo: 'bar' },
      { type: 'java.util.Date', bar: 'baz' },
      { type: 'java.util.ArrayList' }
    ]);

    const expectedImports = [
      { path: 'java.util.List' },
      { path: 'java.util.Date' },
      { path: 'java.util.ArrayList' }
    ];

    assert.deepEqual(expectedImports, imports);
  });

  it('returns types in nested objects as imports', () => {
    const { imports } = importCollectorMiddleware([
      {
        type: 'java.util.List',
        nested: {
          type: 'java.math.BigDecimal'
        }
      },
      { type: 'java.util.Date' },
      { type: 'java.util.ArrayList' }
    ]);

    const expectedImports = [
      { path: 'java.util.List' },
      { path: 'java.math.BigDecimal' },
      { path: 'java.util.Date' },
      { path: 'java.util.ArrayList' }
    ];

    assert.deepEqual(expectedImports, imports);
  });

  it('returns only unique types as imports', () => {
    const { imports } = importCollectorMiddleware([
      { type: 'java.util.List', foo: 'bar' },
      { type: 'java.util.Date', bar: 'baz' },
      { type: 'java.util.List' }
    ]);

    const expectedImports = [
      { path: 'java.util.List' },
      { path: 'java.util.Date' }
    ];

    assert.deepEqual(expectedImports, imports);
  });

  it('does not collect import of types that are in same package as "inPackage" property', () => {
    const { imports } = importCollectorMiddleware({
      inPackage: 'com.example',
      someTypes: [
        { type: 'com.example.Unicorn' },
        { type: 'java.util.Date' },
        { type: 'foo.com.example.Possum' },
        { type: 'com.example.foo.Tarsius' }
      ]
    });

    const expectedImports = [
      { path: 'java.util.Date' },
      { path: 'foo.com.example.Possum' },
      { path: 'com.example.foo.Tarsius' }
    ];

    assert.deepEqual(expectedImports, imports);
  });

  it('does not collect import of types that are directly in the "java.lang" package', () => {
    const { imports } = importCollectorMiddleware({
      someTypes: [
        { type: 'com.example.Unicorn' },
        { type: 'java.lang.String' },
        { type: 'com.another.example.Pony' }
      ]
    });

    const expectedImports = [
      { path: 'com.example.Unicorn' },
      { path: 'com.another.example.Pony' }
    ];

    assert.deepEqual(expectedImports, imports);
  });
});
