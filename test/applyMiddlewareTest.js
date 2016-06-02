import assert from 'assert';
import { createTemplate } from 'tplate';
import { applyMiddleware } from '../src';
import { readFixture } from './testUtil';

describe('applyMiddleware', () => {
  it('renders segments normally if no middleware is provided', () => {
    const { t } = createTemplate();
    const { classSegment } = applyMiddleware();

    const output = t(classSegment());
    const expectedClass = readFixture('middleware/NonOverriddenClass');
    assert.equal(output, expectedClass);
  });

  it('feeds spec to middleware which is able to override the spec', () => {
    const { t } = createTemplate();
    const classNameOverrideMiddleware = spec =>
      Object.assign({}, spec, { name: 'IAmOverriden' });

    const { classSegment } = applyMiddleware(classNameOverrideMiddleware);

    const output = t(classSegment());
    const expectedClass = readFixture('middleware/OverriddenClassName');
    assert.equal(output, expectedClass);
  });

  it('feeds spec to each middleware which is able to override the other', () => {
    const { t } = createTemplate();
    const classNameOverrideMiddleware = spec =>
      Object.assign({}, spec, { name: 'IAmOverriden' });
    const classNameOverrideMiddleware2 = spec =>
      Object.assign({}, spec, { name: 'IAmOverridenTwice' });

    const { classSegment } = applyMiddleware(
      classNameOverrideMiddleware,
      classNameOverrideMiddleware2);

    const output = t(classSegment());
    const expectedClass = readFixture('middleware/OverriddenClassNameTwice');
    assert.equal(output, expectedClass);
  });
});
