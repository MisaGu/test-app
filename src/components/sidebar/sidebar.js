import {
  $generateTemplate,
} from '$utils';
import sidebar from './sidebar.html';
import './sidebar.scss';

export const SidebarController = (function () {
  const _el = {};

  // Global props
  this.template = $generateTemplate(sidebar);

  // Global functions
  this.render = function () {
    APP.state.side.insertBefore(this.template, APP.state.side.firstChild);
  }

  // Private functions
});