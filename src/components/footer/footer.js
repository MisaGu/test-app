import {
  $generateTemplate
} from '$utils';
import footer from './footer.html';
import './footer.scss';

export const FooterController = (function () {
  const _that = this;

  // Global props
  _that.template = $generateTemplate(footer);

  // Global functions
  _that.render = function () {
    APP.state.footer.insertBefore(_that.template, APP.state.footer.firstChild);
  };
});