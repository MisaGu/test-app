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
  };

  // Global props
  this.template = $generateTemplate(header);

  // Global functions
  this.onInit = function () {
    _el.menu = this.template.querySelector('.headerWrapper__menu');
    _el.menuList = this.template.querySelector('.headerWrapper__menu__list');
    _el.menuItems = Array.apply(null, this.template.querySelectorAll('.headerWrapper__menu__list__item'));
  }

  this.onLoad = function () {
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

  this.render = function () {
    APP.state.root.insertBefore(this.template, APP.state.root.firstChild);
  }

  // Private functions
});