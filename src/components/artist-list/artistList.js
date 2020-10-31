import {
  $generateTemplate,
  $classUtils,
  $attrConverter
} from '$utils';
import artistList from './artistList.html';
import artistListItem from './artistListItem.html';
import './artistList.scss';

export const ArtistListController = (function () {
  const _opt = {
      distToBottom: bottomOffset(),
      dataDisplayed: 0,
      generatingData: false
    },
    _el = {
      filter: null,
      filterOptions: [],
      artistItemTemplate: null,
    };

  // Global props
  this.template = $generateTemplate(artistList);

  // Global functions
  this.onInit = function () {
    _el.filter = this.template.querySelector('.artistListWrapper__filter');
    _el.filterOptions = Array.apply(null, this.template.querySelectorAll('.artistListWrapper__filter__option'));
    _el.content = this.template.querySelector('.artistListWrapper__content');
    _el.loader = this.template.querySelector('.artistListWrapper__loader');
    _el.artistItemTemplate = $generateTemplate(artistListItem);
    $attrConverter(_el.artistItemTemplate);
    renderPagedItems()
  }
  this.onLoad = function () {
    _el.filterOptions.forEach((opt) => opt.addEventListener('click', (e) => {
      _el.filterOptions.forEach((_opt) => $classUtils.removeClassModifier(_opt, 'active'));
      $classUtils.addClassModifier(e.target, 'active');
    }));
    document.addEventListener('scroll', function () {
      _opt.distToBottom = bottomOffset();
      // console.log('scrolling', getDistFromBottom());

      if (!_opt.generatingData && _opt.distToBottom > 0 && _opt.distToBottom <= 200 && _opt.dataDisplayed < APP.state.data.length) {
        _opt.generatingData = true;
        $classUtils.addClassModifier(_el.loader, 'active');
        setTimeout(() => {
          $classUtils.removeClassModifier(_el.loader, 'active');
          renderPagedItems();
        }, 600)
      }
    });
  }
  this.render = function () {
    APP.state.main.appendChild(this.template);
  }

  // Private functions
  function bottomOffset() {
    return Math.max(document.body.offsetHeight - (window.pageYOffset + window.innerHeight), 0);
  }

  function renderPagedItems() {
    const dataDisplayed = _opt.dataDisplayed;

    for (let x = dataDisplayed; x < (dataDisplayed + 6); x++) {
      const artistData = APP.state.data[x];

      if (artistData) {
        const artistEl = _el.artistItemTemplate.cloneNode(true);

        const img = artistEl.querySelector('.artistListItem__img');
        const name = artistEl.querySelector('.artistListItem__name');
        const portrayed = artistEl.querySelector('.artistListItem__portrayed');
        const status = artistEl.querySelector('.artistListItem__status');
        const dob = artistEl.querySelector('.artistListItem__dob');
        const appearance = artistEl.querySelector('.artistListItem__appearance');

        img.style.background = `url(${artistData.img})`;
        name.innerHTML += artistData.name;
        portrayed.innerHTML += artistData.portrayed;
        status.innerHTML += artistData.status;
        dob.innerHTML += artistData.birthday;
        appearance.innerHTML += artistData.appearance ? artistData.appearance.map(s => `S${s}`).join(', ') : '--';

        // postElement.appendChild(desc);
        _el.content.appendChild(artistEl);
        _opt.dataDisplayed++;
      }
    }

    _opt.generatingData = false;
  }
});




// removing the spinner
// loadingContainer.classList.remove('no-content');