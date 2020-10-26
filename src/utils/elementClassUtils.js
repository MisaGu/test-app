function classConverter(node) {
  if (node.nodeType == 1)
    node.className = node.getAttribute('className');
  node = node.firstChild;
  while (node) {
    classConverter(node);
    node = node.nextSibling;
  }
}

function addClass(el, className) {
  const c = el.getAttribute('className');
  if (!el.className.includes(className))
    el.className += className;
}

function addClassEffect(el, effectName) {
  const c = el.getAttribute('className');
  effectName = ` ${c}--${effectName}`;
  if (!el.className.includes(effectName))
    el.className += effectName;
}

function replaceClass(el, replaceableClass, replacementСlass) {
  const c = el.getAttribute('className');
  if (el.className.includes(replaceableClass))
    el.className = c.replace(replaceableClass, replacementСlass);
}

function replaceClassEffect(el, replaceableEffect, replacementEffect) {
  const c = el.getAttribute('className');
  replaceableEffect = ` ${c}--${replaceableEffect}`;
  if (el.className.includes(replaceableEffect))
    el.className = c.replace(replaceableEffect, ` ${c}--${replacementEffect}`);
}

function removeClass(el, removeClass) {
  const c = el.getAttribute('className');
  if (el.className.includes(removeClass))
    el.className = c.replace(removeClass, '');
}

function removeClassEffect(el, removeEffect) {
  const c = el.getAttribute('className');
  removeEffect = ` ${c}--${removeEffect}`;
  if (el.className.includes(removeEffect))
    el.className = c.replace(removeEffect, '');
}

function toggleClass(el, toggleClass) {
  const c = el.getAttribute('className');
  if (!el.className.includes(toggleClass)) addClass(el, toggleClass);
  else removeClass(el, toggleClass);
}

function toggleClassEffect(el, toggleClassEffect) {
  const c = el.getAttribute('className');
  if (!el.className.includes(` ${c}--${toggleClassEffect}`)) addClassEffect(el, toggleClassEffect);
  else removeClassEffect(el, toggleClassEffect);
}

export const classUtils = Object.freeze({
  addClass,
  addClassEffect,
  replaceClass,
  replaceClassEffect,
  removeClass,
  removeClassEffect,
  toggleClass,
  toggleClassEffect,
  classConverter
});