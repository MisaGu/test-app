import { HeaderController } from './components';
import { elUID } from './utils';

// declare glob params
window.APP = {
  uiBkp: {
    xs: 0,
    sm: 480,
    md: 768,
    lg: 1024
  },
  staticControllers: [
    new HeaderController()
  ],
  root: document.getElementById('root'),
  view: {
    bkp: {}
  },
  // custom attr => HTMLElement attr
  reservedAttributes: { 'sd_class': 'className' },
  shadowDOM: new Map()
};

// init render
window.onload = function () {
  generateControllers();
  calcAndAssignBreakpoints();
};


window.onresize = function () {
  const currentBreakpoints = useBreakpoints();
  if (JSON.stringify(currentBreakpoints) != JSON.stringify(APP.view.bkp)) {
    calcAndAssignBreakpoints();
  }
};

function useBreakpoints() {
  return Object.keys(APP.uiBkp).reduce((acc, key) => (acc[key] = window.innerWidth >= APP.uiBkp[key], acc), {});
}

function useBreakpointsStringify(bp) {
  return Object.keys(bp).reduce((acc, key) => (bp[key] && acc.push(key), acc), []).join(' ');
}

function attrConverter(node, attrs = Object.keys(APP.reservedAttributes)) {
  // convert reserved attributes to HTMLElement attributes
  if (node.nodeType == 1) {
    const cloneNode = node.cloneNode();
    attrs.forEach((rAttr) => {
      if (node.getAttribute(rAttr)) {
        node[APP.reservedAttributes[rAttr]] = node.getAttribute(rAttr);
        node.removeAttribute(rAttr);

        APP.shadowDOM.set(
          node, Object.keys(cloneNode.attributes).reduce((acc, key) =>
            (acc[cloneNode.attributes[key].name] = cloneNode.attributes[key].value, acc),
            {}
          )
        );
      }
    });
  }
  node = node.firstChild;
  while (node) {
    attrConverter(node);
    node = node.nextSibling;
  }
}

function generateControllers() {
  for (let _ in APP.staticControllers) {
    const node = APP.staticControllers[_];
    attrConverter(node.template);
    APP.root.appendChild(node.template);
    if (node.onInit) node.onInit();
    if (node.onLoad) document.addEventListener('loadstart', node.onLoad());
  }
}

function calcAndAssignBreakpoints() {
  APP.view.bkp = useBreakpoints();
  APP.root.className = useBreakpointsStringify(APP.view.bkp);
}