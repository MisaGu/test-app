import {
  $generateTemplate,
  $classUtils
} from '$utils';
import header from './header.html';
import './header.scss';

export const HeaderController = (function () {
  const _el = {
      menu: null,
      menuItems: []
    },
    _that = this;

  // Global props
  _that.template = $generateTemplate(header);

  // Global functions
  _that.onInit = function () {
    _el.menu = _that.template.querySelector('.headerWrapper__menu');
    _el.menuList = _that.template.querySelector('.headerWrapper__list');
    _el.menuItems = Array.apply(null, _that.template.querySelectorAll('.headerWrapper__item'));
  }

  _that.onLoad = function () {
    _el.menu.addEventListener('mouseenter', () => {
      if (!APP.state.viewBkp.sm) $classUtils.addClassModifier(_el.menu, 'opened');
    });
    _el.menu.addEventListener('mouseleave', () => {
      $classUtils.removeClassModifier(_el.menu, 'opened');
    });
    _el.menu.addEventListener('click', () => {
      if (!APP.state.viewBkp.sm) $classUtils.toggleClassModifier(_el.menu, 'opened');
    });
    _el.menuItems.forEach((opt) => opt.addEventListener('click', (e) => {
      _el.menuItems.forEach((_opt) => $classUtils.removeClassModifier(_opt, 'active'));
      $classUtils.addClassModifier(e.target, 'active');
    }));
  }

  _that.render = function () {
    APP.state.root.insertBefore(_that.template, APP.state.root.firstChild);
  }

  // Private functions
});