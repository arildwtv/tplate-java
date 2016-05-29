import { genericTypeSegment } from './genericTypeSegment';
import { getValueOrRenderSegment } from './util';
import { accessModifierSegment } from './accessModifierSegment';

export function fieldSegment({
  accessModifier = 'private',
  scope = 'instance',
  final = true,
  type = 'String',
  genericTypes = [],
  name,
  assign
  } = {}) {
  const scopeString = scope === 'class' ? 'static ' : '';
  const finalString = final ? 'final ' : '';
  return tplate => {
    const { t } = tplate;
    const assignString = assign ? ` = ${getValueOrRenderSegment(tplate, assign)}` : '';
    return t(
      `${accessModifierSegment(accessModifier)}${scopeString}${finalString}` +
      `${type}${genericTypeSegment(genericTypes)} ${name}${assignString};`
    );
  };
}
