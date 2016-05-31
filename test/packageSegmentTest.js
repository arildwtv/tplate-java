import assert from 'assert';
import { createTemplate } from 'tplate';
import { packageSegment } from '../src';

describe('packageSegment', () => {
  it('renders nothing if package is undefined', () => {
    const { t } = createTemplate();
    const output = t(packageSegment());
    assert.equal(output, '');
  });

  it('renders package', () => {
    const { t } = createTemplate();
    const output = t(packageSegment('com.example.mypackage'));
    assert.equal(output, 'package com.example.mypackage;');
  });
});
