import assert from 'assert';
import { createTemplate } from 'tplate';
import { importSegment } from '../src';
import { readFixture } from './testUtil';

describe('importSegment', () => {
  it('renders non-static import by default', () => {
    const { t } = createTemplate();
    const output = t(importSegment({
      type: 'com.example.mypackage.MyClass'
    }));
    assert.equal(output, 'import com.example.mypackage.MyClass;');
  });

  it('renders static import if this argument is provided', () => {
    const { t } = createTemplate();
    const output = t(importSegment({
      type: 'com.example.mypackage.MyClass',
      staticImport: true
    }));
    assert.equal(output, 'import static com.example.mypackage.MyClass;');
  });

  it('renders import using wildcard if type contains it', () => {
    const { t } = createTemplate();
    const output = t(importSegment({
      type: 'com.example.mypackage.*'
    }));
    assert.equal(output, 'import com.example.mypackage.*;');
  });
});
