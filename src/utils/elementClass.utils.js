function addClass(el, className) {
  const c = APP.state.shadowDOM.get(el).sd_class;
  if (el.className.indexOf(className) == -1)
    el.className += className;
}

function addClassEffect(el, effectName) {
  const c = APP.state.shadowDOM.get(el).sd_class;
  effectName = ` ${c}--${effectName}`;
  if (el.className.indexOf(effectName) == -1)
    el.className += effectName;
}

function replaceClass(el, replaceableClass, replacementСlass) {
  const c = APP.state.shadowDOM.get(el).sd_class;
  if (el.className.indexOf(replaceableClass) != -1)
    el.className = c.replace(replaceableClass, replacementСlass);
}

function replaceClassEffect(el, replaceableEffect, replacementEffect) {
  const c = APP.state.shadowDOM.get(el).sd_class;
  replaceableEffect = ` ${c}--${replaceableEffect}`;
  if (el.className.indexOf(replaceableEffect) != -1)
    el.className = c.replace(replaceableEffect, ` ${c}--${replacementEffect}`);
}

function removeClass(el, removeClass) {
  const c = APP.state.shadowDOM.get(el).sd_class;
  if (el.className.indexOf(removeClass) != -1)
    el.className = c.replace(removeClass, '');
}

function removeClassEffect(el, removeEffect) {
  const c = APP.state.shadowDOM.get(el).sd_class;
  removeEffect = ` ${c}--${removeEffect}`;
  if (el.className.indexOf(removeEffect) != -1)
    el.className = c.replace(removeEffect, '');
}

function toggleClass(el, toggleClass) {
  const c = APP.state.shadowDOM.get(el).sd_class;
  if (el.className.indexOf(toggleClass) == -1) addClass(el, toggleClass);
  else removeClass(el, toggleClass);
}

function toggleClassEffect(el, toggleClassEffect) {
  const c = APP.state.shadowDOM.get(el).sd_class;
  if (el.className.indexOf(` ${c}--${toggleClassEffect}`) == -1) addClassEffect(el, toggleClassEffect);
  else removeClassEffect(el, toggleClassEffect);
}

export const $classUtils = Object.freeze({
  addClass,
  addClassEffect,
  replaceClass,
  replaceClassEffect,
  removeClass,
  removeClassEffect,
  toggleClass,
  toggleClassEffect,
});