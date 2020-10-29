import {
  config
} from './config';

window.APP = new(function ($, $$) {
  this.state = $.state;

  // Init
  $$.addEventListener('load', () => {
    this.generateControllers();
    this.calcAndAssignBreakpoints();
  });

  $$.addEventListener('resize', () => {
    const currentBreakpoints = calcBreakpoints();
    if (JSON.stringify(currentBreakpoints) != JSON.stringify($.state.view.bkp)) {
      this.calcAndAssignBreakpoints();
    }
  });

  this.generateControllers = function () {
    for (let _ in $.config.controllers) {
      const controller = $.config.controllers[_];

      attrConverter(controller.template, Object.keys($.config.attributesMap));

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
    $.state.view.bkp = calcBreakpoints();
    $.state.root.className = calcBreakpointsStringify($.state.view.bkp);
  }

  // Private functions
  function attrConverter(node, config_attrs) {
    // convert reserved attributes to HTMLElement attributes
    if (node.nodeType == 1) {
      const cloneNode = node.cloneNode();
      const cloneAttr = Object.keys(cloneNode.attributes).reduce((acc, key) =>
        (acc[cloneNode.attributes[key].name] = cloneNode.attributes[key].value, acc), {});

      config_attrs.forEach((rAttr) => {
        if (cloneAttr[rAttr]) {
          switch (true) {
            case ['svg', 'polygon', 'polyline', 'g'].indexOf(node.tagName) != -1:
              node.setAttribute($.config.attributesMap[rAttr].attr, cloneAttr[rAttr]);
              break;
            default:
              node[$.config.attributesMap[rAttr].param] = cloneAttr[rAttr];
          }

          const attrEffect = $.config.attributesMap[rAttr].effect;
          if (attrEffect) attrEffect(node, cloneAttr[rAttr])
          node.removeAttribute(rAttr);

          $.state.shadowDOM.set(node, cloneAttr);
        }
      });
    }
    node = node.firstChild;
    while (node) {
      attrConverter(node, config_attrs);
      node = node.nextSibling;
    }
  }

  function calcBreakpoints() {
    const bkp = $.config.gridBreakpoints;
    return Object.keys(bkp).reduce((acc, key) => {
      acc[key] = $$.innerWidth >= bkp[key] ? bkp[key] : false;
      return acc
    }, {});
  }

  function calcBreakpointsStringify(bkp) {
    return Object.keys(bkp).reduce((acc, key) => (bkp[key] && acc.push(key), acc), []).join(' ');
  }
})(config, window);