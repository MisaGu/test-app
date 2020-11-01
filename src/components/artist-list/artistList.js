import {
  $generateTemplate,
  $classUtils,
  $attrConverter,
  $cookie
} from '$utils';
import artistList from './artistList.html';
import artistListItem from './artistListItem.html';
import './artistList.scss';

export const ArtistListController = (function () {
  const _opt = {
      distToBottom: 1000,
      dataDisplayed: 0,
      generatingData: false,
      sortedData: null,
      sortType: $cookie.get('TEST_APP__sortType') || 'name'
    },
    _el = {
      filter: null,
      filterOptions: [],
      artistItemTemplate: null,
      displayedArtists: []
    },
    _that = this;

  // Global props
  _that.template = $generateTemplate(artistList);

  // Global functions
  _that.onInit = function () {
    _opt.sortedData = {
      name: APP.state.data.slice().sort(sortByName),
      status: APP.state.data.slice().sort(sortByStatus),
      appearance: APP.state.data.slice().sort(sortByAppearance),
    };

    _el.filter = _that.template.querySelector('.artistListWrapper__filter');
    _el.filterOptions = Array.apply(null, _that.template.querySelectorAll('.artistListWrapper__option'));
    _el.content = _that.template.querySelector('.artistListWrapper__content');
    _el.loader = _that.template.querySelector('.artistListWrapper__loader');
    _el.artistItemTemplate = $generateTemplate(artistListItem);
    $attrConverter(_el.artistItemTemplate);


    calcBottomOffset();
    selectFilterOption(_opt.sortType);
    renderPagedItems(false);
  }
  _that.onLoad = function () {
    window.scrollTo(0, 0);

    _el.filterOptions.forEach((opt) => opt.addEventListener('click', (e) => {
      const _sortType = e.target.getAttribute('type');
      $cookie.set('TEST_APP__sortType', _sortType, 7);
      selectFilterOption(_sortType);
      _that.setSortType(_sortType);
      renderPagedItems(true);
    }));

    document.addEventListener('scroll', function () {
      calcBottomOffset();

      if (!_opt.generatingData && _opt.distToBottom >= 70 && _opt.dataDisplayed < APP.state.data.length) {
        _opt.generatingData = true;
        $classUtils.addClassModifier(_el.loader, 'active');
        setTimeout(() => {
          $classUtils.removeClassModifier(_el.loader, 'active');
          renderPagedItems(false);
        }, 800)
      } else if (_opt.dataDisplayed >= APP.state.data.length) {
        $classUtils.addClassModifier(_el.loader, 'hide');
      }
    });
  }
  _that.render = function () {
    APP.state.main.appendChild(_that.template);
  }
  _that.setSortType = function (type) {
    _opt.sortType = type;
  }

  // Private functions
  function selectFilterOption(sortType) {
    _el.filterOptions.forEach((_opt) => {
      $classUtils.removeClassModifier(_opt, 'active');
      if (_opt.getAttribute('type') == sortType) $classUtils.addClassModifier(_opt, 'active');
    });
  }

  function calcBottomOffset() {
    _opt.distToBottom = (window.pageYOffset + window.innerHeight) - (_that.template.offsetTop + _that.template.offsetHeight);
  }

  function renderPagedItems(rerender) {
    const dataDisplayed = _opt.dataDisplayed;
    if (rerender) {
      _el.content.innerHTML = '';
    }

    for (let x = (rerender ? 0 : dataDisplayed); x < (dataDisplayed + (rerender ? 0 : 6)); x++) {
      const artistData = _opt.sortedData[_opt.sortType][x];

      if (artistData) {
        const artistEl = _el.artistItemTemplate.cloneNode(true);

        const img = artistEl.querySelector('.artistListItem__img');
        const name = artistEl.querySelector('.artistListItem__name');
        const portrayed = artistEl.querySelector('.artistListItem__portrayed');
        const status = artistEl.querySelector('.artistListItem__status');
        const dob = artistEl.querySelector('.artistListItem__dob');
        const appearance = artistEl.querySelector('.artistListItem__appearance');

        img.style.background = `url(${artistData.img}) 0 15%, url(icons/no-img.svg) center center`;
        name.innerHTML += artistData.name;
        portrayed.innerHTML += artistData.portrayed;
        status.innerHTML += artistData.status;
        dob.innerHTML += artistData.birthday;
        appearance.innerHTML += artistData.appearance ? artistData.appearance.map(s => `S${s}`).join(', ') : '--';

        // postElement.appendChild(desc);
        _el.content.appendChild(artistEl);

        if (!rerender) _opt.dataDisplayed++;
      }
    }

    _opt.generatingData = false;
  }

  function sortByName(a, b) {
    return ~-(a.name.split(' ').map(word => word[0]).join('') > b.name.split(' ').map(word => word[0]).join(''))
  }

  function sortByStatus(a, b) {
    return ~-(a.status.split(' ').map(word => word[0]).join('') > b.status.split(' ').map(word => word[0]).join(''))
  }

  function sortByAppearance(a, b) {
    return ~-((a.appearance ? a.appearance.length : '') < (b.appearance ? b.appearance.length : ''))
  }
});




// removing the spinner
// loadingContainer.classList.remove('no-content');