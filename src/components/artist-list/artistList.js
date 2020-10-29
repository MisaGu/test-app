import {
  $generateTemplate,
  $classUtils
} from '$utils';
import artistList from './artistList.html';
import './artistList.scss';

export const ArtistListController = (function () {
  const _el = {
    filter: null,
    filter__options: []
  };

  // Global props
  this.template = $generateTemplate(artistList);

  // Global functions
  this.onInit = function () {
    _el.filter = this.template.querySelector('.artistListWrapper__filter');
    _el.filter__options = Array.apply(null, this.template.querySelectorAll('.artistListWrapper__filter__option'));
  }
  this.onLoad = function () {
    _el.filter__options.forEach((opt) => opt.addEventListener('click', (e) => {
      _el.filter__options.forEach((_opt) => $classUtils.removeClassModifier(_opt, 'active'));
      $classUtils.addClassModifier(e.target, 'active');
    }));
  }
  this.render = function () {
    APP.state.main.appendChild(this.template);
  }

  // Private functions
});