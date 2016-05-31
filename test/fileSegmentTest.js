import assert from 'assert';
import { createTemplate } from 'tplate';
import { fileSegment } from '../src';
import { readFixture } from './testUtil';

describe('fileSegment', () => {
  it('renders a default class with no package and no imports by default', () => {
    const { t } = createTemplate();
    const output = t(fileSegment());
    const expectedFileOutput = readFixture('file/defaultClassFileWithoutImports');
    assert.equal(output, expectedFileOutput);
  });

  it('renders imports if this argument is provided', () => {
    const { t } = createTemplate();
    const output = t(fileSegment({
      inPackage: 'com.example.mypackage',
      imports: [
        { type: 'java.util.List' },
        { type: 'java.util.Date' }
      ],
      javaClass: {
        fields: [
          {
            name: 'list',
            type: 'List',
            genericTypes: [{ type: 'Date' }],
            final: false
          }
        ]
      }
    }));
    const expectedFileOutput = readFixture('file/classFileWithImports');
    assert.equal(output, expectedFileOutput);
  });

  it('renders a default enum if this argument is provided', () => {
    const { t } = createTemplate();
    const output = t(fileSegment({
      inPackage: 'com.example.mypackage',
      javaEnum: {}
    }));
    const expectedFileOutput = readFixture('file/enumFile');
    assert.equal(output, expectedFileOutput);
  });

  it('renders a default interface if this argument is provided', () => {
    const { t } = createTemplate();
    const output = t(fileSegment({
      inPackage: 'com.example.mypackage',
      javaInterface: {}
    }));
    const expectedFileOutput = readFixture('file/interfaceFile');
    assert.equal(output, expectedFileOutput);
  });
});
