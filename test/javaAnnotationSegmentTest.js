import assert from 'assert';
import { createTemplate } from 'tplate';
import { javaAnnotationSegment, javaStringLiteralSegment, javaArrayLiteralSegment } from '../src';
import { readFixture } from './testUtil';

describe('javaAnnotationSegment', () => {
  it('renders default annotation if no arguments are provided', () => {
    const { t } = createTemplate();
    const output = t(javaAnnotationSegment());
    const expectedAnnotation = readFixture('annotation/defaultAnnotation');
    assert.equal(output, expectedAnnotation);
  });

  it('renders annotation name if name argument is provided', () => {
    const { t } = createTemplate();
    const output = t(javaAnnotationSegment({
      name: 'Override'
    }));
    const expectedAnnotation = readFixture('annotation/annotationWithName');
    assert.equal(output, expectedAnnotation);
  });

  it('renders annotation with value if value argument is provided', () => {
    const { t } = createTemplate();
    const output = t(javaAnnotationSegment({
      name: 'SuppressWarnings',
      value: javaStringLiteralSegment('unchecked')
    }));
    const expectedAnnotation = readFixture('annotation/annotationWithNameAndValue');
    assert.equal(output, expectedAnnotation);
  });

  it('renders annotation with arguments if args argument is provided', () => {
    const { t } = createTemplate();
    const output = t(javaAnnotationSegment({
      name: 'SuppressWarnings',
      args: [
        { name: 'firstVar', value: javaStringLiteralSegment('foo') },
        { name: 'secondVar', value: javaStringLiteralSegment('bar') },
        { name: 'thirdVar', value: 1337 }
      ]
    }));
    const expectedAnnotation = readFixture('annotation/annotationWithNameAndArguments');
    assert.equal(output, expectedAnnotation);
  });

  it('renders annotation with array literal arguments if args argument is provided', () => {
    const { t } = createTemplate();
    const output = t(javaAnnotationSegment({
      name: 'SuppressWarnings',
      args: [
        { name: 'firstVar', value: javaStringLiteralSegment('foo') },
        { name: 'secondVar', value: javaArrayLiteralSegment([
          javaStringLiteralSegment('bar'),
          javaStringLiteralSegment('baz')
        ])},
        { name: 'thirdVar', value: 1337 }
      ]
    }));
    const expectedAnnotation = readFixture('annotation/annotationWithNameAndArrayArguments');
    assert.equal(output, expectedAnnotation);
  });

  it('renders annotation with annotation array arguments if such an args argument is provided', () => {
    const { t } = createTemplate();
    const output = t(javaAnnotationSegment({
      name: 'MySetOfAnnotations',
      args: [
        { name: 'setName', value: javaStringLiteralSegment('foo') },
        { name: 'annotations', value: javaArrayLiteralSegment([
          javaAnnotationSegment({ name: 'MyBarAnno', value: '1337' }),
          javaAnnotationSegment({ name: 'MyBazAnno', value: '1338' })
        ])}
      ]
    }));
    const expectedAnnotation = readFixture('annotation/annotationWithAnnotationArrayArguments');
    assert.equal(output, expectedAnnotation);
  });
});
