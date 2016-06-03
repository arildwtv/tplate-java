import assert from 'assert';
import { createTemplate } from 'tplate';
import { applyMiddleware } from '../src';
import { importCollectorMiddleware } from '../src/middleware/importCollectorMiddleware';
import { typePackageRemoverMiddleware } from '../src/middleware/typePackageRemoverMiddleware';
import { readFixture } from './testUtil';

describe('fileSegmentWithMiddleware', () => {
  it('renders a default class with no package and no imports by default', () => {
    const { t } = createTemplate();
    const { fileSegment } = applyMiddleware(
      importCollectorMiddleware,
      typePackageRemoverMiddleware
    );

    const output = t(fileSegment({
      inPackage: 'com.my.example',
      javaClass: {
        annotations: [
          { type: 'org.springframework.stereotype.Component' }
        ],
        name: 'AwesomeComponent',
        extendsClass: {
          type: 'com.my.package.another.SuperAwesomeClass'
        },
        fields: [
          { type: 'java.lang.String', name: 'myAwesomeString' },
          {
            annotations: [
              { type: 'org.springframework.beans.factory.annotation.Autowired' }
            ],
            type: 'com.my.package.yet.another.UnicornDao',
            name: 'myAwesomeUnicornDao'
          }
        ]
      }
    }));

    const expectedFileOutput = readFixture('middleware/ClassFileWithAutomaticImports');
    assert.equal(output, expectedFileOutput);
  });
});
