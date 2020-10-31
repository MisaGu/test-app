function addClass(el, className) {
  const c = (APP.state.shadowDOM.get(el) && APP.state.shadowDOM.get(el).sd_class) || el.getAttribute('id');
  if (el.className.indexOf(className) == -1)
    el.className = (el.className + ' ' + className).trim();
}

function addClassModifier(el, modifierName) {
  const c = (APP.state.shadowDOM.get(el) && APP.state.shadowDOM.get(el).sd_class) || el.getAttribute('id');
  modifierName = ` ${c}--${modifierName}`;
  if (el.className.indexOf(modifierName) == -1)
    el.className = (el.className + ' ' + modifierName).trim();
}

function replaceClass(el, replaceableClass, replacementСlass) {
  const c = (APP.state.shadowDOM.get(el) && APP.state.shadowDOM.get(el).sd_class) || el.getAttribute('class');
  if (el.className.indexOf(replaceableClass) != -1)
    el.className = c.replace(replaceableClass, replacementСlass).trim();
}

function replaceClassModifier(el, replaceableModifier, replacementModifier) {
  const c = (APP.state.shadowDOM.get(el) && APP.state.shadowDOM.get(el).sd_class) || el.getAttribute('class');
  replaceableModifier = ` ${c}--${replaceableModifier}`;
  if (el.className.indexOf(replaceableModifier) != -1)
    el.className = c.replace(replaceableModifier, ` ${c}--${replacementModifier}`).trim();
}

function removeClass(el, removeClass) {
  const c = (APP.state.shadowDOM.get(el) && APP.state.shadowDOM.get(el).sd_class) || el.getAttribute('class');
  if (el.className.indexOf(removeClass) != -1)
    el.className = c.replace(removeClass, '').trim();
}

function removeClassModifier(el, removeModifier) {
  const c = (APP.state.shadowDOM.get(el) && APP.state.shadowDOM.get(el).sd_class) || el.getAttribute('class');
  removeModifier = ` ${c}--${removeModifier}`;
  if (el.className.indexOf(removeModifier) != -1)
    el.className = c.replace(removeModifier, '').trim();
}

function toggleClass(el, toggleClass) {
  const c = (APP.state.shadowDOM.get(el) && APP.state.shadowDOM.get(el).sd_class) || el.getAttribute('class');
  if (el.className.indexOf(toggleClass) == -1) addClass(el, toggleClass);
  else removeClass(el, toggleClass);
}

function toggleClassModifier(el, toggleClassModifier) {
  const c = (APP.state.shadowDOM.get(el) && APP.state.shadowDOM.get(el).sd_class) || el.getAttribute('class');
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