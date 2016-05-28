import { javaGenericTypeSegment } from './javaGenericTypeSegment';
import { getValueOrRenderSegment } from './util';
import { javaAccessModifierSegment } from './javaAccessModifierSegment';

export function javaFieldSegment({
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
      `${javaAccessModifierSegment(accessModifier)}${scopeString}${finalString}` +
      `${type}${javaGenericTypeSegment(genericTypes)} ${name}${assignString};`
    );
  };
}
