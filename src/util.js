export function interweave(array, interweaveItem = '') {
  const interwovenArray = array.reduce((prevArray, item) =>
      prevArray.concat(item, interweaveItem),
    []);
  interwovenArray.pop();
  return interwovenArray;
}

export function getValueOrRenderSegment(tplate, value) {
  return typeof value === 'function' ? value(tplate) : value;
}
