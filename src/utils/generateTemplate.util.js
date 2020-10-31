export const $generateTemplate = function (source) {
  if (typeof source === 'string') {
    const el = document.createElement('div');
    el.innerHTML = source;
    return el.firstChild;
  }
  return null;
}