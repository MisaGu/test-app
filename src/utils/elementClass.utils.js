function addClass(el, className) {
  const c = APP.state.shadowDOM.get(el).sd_class;
  if (el.className.indexOf(className) == -1)
    el.className += className;
}

function addClassModifier(el, modifierName) {
  const c = APP.state.shadowDOM.get(el).sd_class;
  modifierName = ` ${c}--${modifierName}`;
  if (el.className.indexOf(modifierName) == -1)
    el.className += modifierName;
}

function replaceClass(el, replaceableClass, replacementСlass) {
  const c = APP.state.shadowDOM.get(el).sd_class;
  if (el.className.indexOf(replaceableClass) != -1)
    el.className = c.replace(replaceableClass, replacementСlass);
}

function replaceClassModifier(el, replaceableModifier, replacementModifier) {
  const c = APP.state.shadowDOM.get(el).sd_class;
  replaceableModifier = ` ${c}--${replaceableModifier}`;
  if (el.className.indexOf(replaceableModifier) != -1)
    el.className = c.replace(replaceableModifier, ` ${c}--${replacementModifier}`);
}

function removeClass(el, removeClass) {
  const c = APP.state.shadowDOM.get(el).sd_class;
  if (el.className.indexOf(removeClass) != -1)
    el.className = c.replace(removeClass, '');
}

function removeClassModifier(el, removeModifier) {
  const c = APP.state.shadowDOM.get(el).sd_class;
  removeModifier = ` ${c}--${removeModifier}`;
  if (el.className.indexOf(removeModifier) != -1)
    el.className = c.replace(removeModifier, '');
}

function toggleClass(el, toggleClass) {
  const c = APP.state.shadowDOM.get(el).sd_class;
  if (el.className.indexOf(toggleClass) == -1) addClass(el, toggleClass);
  else removeClass(el, toggleClass);
}

function toggleClassModifier(el, toggleClassModifier) {
  const c = APP.state.shadowDOM.get(el).sd_class;
  if (el.className.indexOf(` ${c}--${toggleClassModifier}`) == -1) addClassModifier(el, toggleClassModifier);
  else removeClassModifier(el, toggleClassModifier);
}

export const $classUtils = Object.freeze({
  addClass,
  addClassModifier,
  replaceClass,
  replaceClassModifier,
  removeClass,
  removeClassModifier,
  toggleClass,
  toggleClassModifier,
});