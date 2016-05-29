import assert from 'assert';
import { createTemplate } from 'tplate';
import { annotationSegment, stringLiteralSegment, arrayLiteralSegment } from '../src';
import { readFixture } from './testUtil';

describe('annotationSegment', () => {
  it('renders default annotation if no arguments are provided', () => {
    const { t } = createTemplate();
    const output = t(annotationSegment());
    const expectedAnnotation = readFixture('annotation/defaultAnnotation');
    assert.equal(output, expectedAnnotation);
  });

  it('renders annotation name if name argument is provided', () => {
    const { t } = createTemplate();
    const output = t(annotationSegment({
      type: 'Override'
    }));
    const expectedAnnotation = readFixture('annotation/annotationWithName');
    assert.equal(output, expectedAnnotation);
  });

  it('renders annotation with value if value argument is provided', () => {
    const { t } = createTemplate();
    const output = t(annotationSegment({
      type: 'SuppressWarnings',
      value: stringLiteralSegment('unchecked')
    }));
    const expectedAnnotation = readFixture('annotation/annotationWithNameAndValue');
    assert.equal(output, expectedAnnotation);
  });

  it('renders annotation with arguments if args argument is provided', () => {
    const { t } = createTemplate();
    const output = t(annotationSegment({
      type: 'SuppressWarnings',
      args: [
        { name: 'firstVar', value: stringLiteralSegment('foo') },
        { name: 'secondVar', value: stringLiteralSegment('bar') },
        { name: 'thirdVar', value: 1337 }
      ]
    }));
    const expectedAnnotation = readFixture('annotation/annotationWithNameAndArguments');
    assert.equal(output, expectedAnnotation);
  });

  it('renders annotation with array literal arguments if args argument is provided', () => {
    const { t } = createTemplate();
    const output = t(annotationSegment({
      type: 'SuppressWarnings',
      args: [
        { name: 'firstVar', value: stringLiteralSegment('foo') },
        { name: 'secondVar', value: arrayLiteralSegment([
          stringLiteralSegment('bar'),
          stringLiteralSegment('baz')
        ])},
        { name: 'thirdVar', value: 1337 }
      ]
    }));
    const expectedAnnotation = readFixture('annotation/annotationWithNameAndArrayArguments');
    assert.equal(output, expectedAnnotation);
  });

  it('renders annotation with annotation array arguments if such an args argument is provided', () => {
    const { t } = createTemplate();
    const output = t(annotationSegment({
      type: 'MySetOfAnnotations',
      args: [
        { name: 'setName', value: stringLiteralSegment('foo') },
        { name: 'annotations', value: arrayLiteralSegment([
          annotationSegment({ type: 'MyBarAnno', value: '1337' }),
          annotationSegment({ type: 'MyBazAnno', value: '1338' })
        ])}
      ]
    }));
    const expectedAnnotation = readFixture('annotation/annotationWithAnnotationArrayArguments');
    assert.equal(output, expectedAnnotation);
  });
});
