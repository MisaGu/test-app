import {
  $generateTemplate,
} from '$utils';
import sidebar from './sidebar.html';
import './sidebar.scss';

export const SidebarController = (function () {
  const _that = this;

  // Global props
  _that.template = $generateTemplate(sidebar);

  // Global functions
  _that.render = function () {
    APP.state.side.insertBefore(_that.template, APP.state.side.firstChild);
  }

  // Private functions
});