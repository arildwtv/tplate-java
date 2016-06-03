import assert from 'assert';
import { createTemplate } from 'tplate';
import { importSegment } from '../src';

describe('importSegment', () => {
  it('renders non-static import by default', () => {
    const { t } = createTemplate();
    const output = t(importSegment({
      path: 'com.example.mypackage.MyClass'
    }));
    assert.equal(output, 'import com.example.mypackage.MyClass;');
  });

  it('renders static import if this argument is provided', () => {
    const { t } = createTemplate();
    const output = t(importSegment({
      path: 'com.example.mypackage.MyClass',
      staticImport: true
    }));
    assert.equal(output, 'import static com.example.mypackage.MyClass;');
  });

  it('renders import using wildcard if "path" contains it', () => {
    const { t } = createTemplate();
    const output = t(importSegment({
      path: 'com.example.mypackage.*'
    }));
    assert.equal(output, 'import com.example.mypackage.*;');
  });
});
