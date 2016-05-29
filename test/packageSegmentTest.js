import assert from 'assert';
import { createTemplate } from 'tplate';
import { packageSegment } from '../src';
import { readFixture } from './testUtil';

describe('packageSegment', () => {
  it('renders package', () => {
    const { t } = createTemplate();
    const output = t(packageSegment('com.example.mypackage'));
    assert.equal(output, 'package com.example.mypackage;');
  });
});
