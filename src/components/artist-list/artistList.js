import {
  $generateTemplate,
} from '$utils';
import artistList from './artistList.html';
import './artistList.scss';

export const ArtistListController = (function () {
  const _el = {};

  // Global props
  this.template = $generateTemplate(artistList);

  // Global functions
  this.render = function () {
    APP.state.main.appendChild(this.template);
  }

  // Private functions
});