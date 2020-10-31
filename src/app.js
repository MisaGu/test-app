import {
  $classUtils,
  $attrConverter
} from '$utils';
import {
  config
} from './config';

window.APP = new(function ($, $$) {
  this.state = $.state;
  this.config = $.config;

  // Init
  $$.addEventListener('load', () => {
    loadData();
    if ($.state.data) {
      this.generateControllers();
      this.calcAndAssignBreakpoints();
    }
  });

  $$.addEventListener('resize', () => {
    const currentBreakpoints = calcBreakpoints();
    if (JSON.stringify(currentBreakpoints) != JSON.stringify($.state.viewBkp)) {
      this.calcAndAssignBreakpoints();
    }
  });

  this.generateControllers = function () {
    for (let _ in $.config.controllers) {
      const controller = $.config.controllers[_];

      $attrConverter(controller.template, true);

      if (controller.onInit)
        controller.onInit();
      if (controller.onLoad)
        document.addEventListener('loadstart', controller.onLoad());
      if (controller.render)
        controller.render();
      else {
        console.error(`Controller ${controller.constructor.name} missing 'render' function!`)
      }
    }
  }

  this.calcAndAssignBreakpoints = function () {
    $.state.viewBkp = calcBreakpoints();
    Object.keys($.state.viewBkp).forEach(brp => {
      if ($.state.viewBkp[brp] !== false) $classUtils.addClass($.state.root, brp);
      else $classUtils.removeClass($.state.root, brp);
    })
  }

  function loadData() {
    const xhr = new XMLHttpRequest();

    function showError(error) {
      if ($.state.data == null && $.state.root.querySelector('.root__error') == null) {
        const el = document.createElement('div');
        el.className = 'root__error'
        el.innerHTML = `${error}<br\> Try to reload`;
        $.state.root.appendChild(el);
      }
    }

    xhr.open('GET', 'https://www.breakingbadapi.com/api/characters', false);
    try {
      xhr.send();
      if (xhr.status != 200) {
        showError(`Error ${xhr.status}: ${xhr.statusText}`);
      } else {
        $.state.data = JSON.parse(xhr.responseText);
        $classUtils.addClassModifier($.state.root, 'ready');
      }
    } catch (err) { // instead of onerror IE10+
      showError("Request failed");
      $classUtils.addClassModifier($.state.root, 'error');
    }
  }

  // Private functions
  function calcBreakpoints() {
    const bkp = $.config.gridBreakpoints;
    return Object.keys(bkp).reduce((acc, key) => {
      acc[key] = $$.innerWidth >= bkp[key] ? bkp[key] : false;
      return acc
    }, {});
  }

  function calcBreakpointsStringify(bkp) {
    return Object.keys(bkp).reduce((acc, key) => (bkp[key] !== false && acc.push(key), acc), []).join(' ');
  }
})(config, window);