import {
  $generateTemplate,
  $classUtils
} from '$utils';
import header from './header.html';
import './header.scss';

export const HeaderController = (function () {
  const _el = {
    menu: null
  };

  // Global props
  this.template = $generateTemplate(header);

  // Global functions
  this.onInit = function () {
    _el.menu = this.template.querySelector('.headerWrapper__menu');
  }

  this.onLoad = function () {
    _el.menu.addEventListener('mouseenter', () => {
      $classUtils.addClassEffect(_el.menu, 'opened');
    });
    _el.menu.addEventListener('mouseleave', () => {
      $classUtils.removeClassEffect(_el.menu, 'opened');
    });
    _el.menu.addEventListener('click', () => {
      $classUtils.toggleClassEffect(_el.menu, 'opened');
    });
  }

  this.render = function () {
    APP.state.root.insertBefore(this.template, APP.state.root.firstChild);
  }

  // Private functions
});