import { HeaderController } from './components'
import { classUtils } from './utils';

const $$ = window;

// declare glob params
Object.assign(window, {
  APP: {
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
    }
  }
});

// init render
$$.onload = function () {
  generateControllers();
  calcAndAssignBreakpoints();
};


$$.onresize = function () {
  const currentBreakpoints = useBreakpoints();
  if (JSON.stringify(currentBreakpoints) != JSON.stringify(APP.view.bkp)) {
    calcAndAssignBreakpoints();
  }
};

function useBreakpoints() {
  return Object.keys(APP.uiBkp).reduce((acc, key) => Object.assign(acc, { [key]: $$.innerWidth >= APP.uiBkp[key] }), {})
}

function useBreakpointsStringify(bp) {
  return Object.keys(bp).reduce((acc, key) => (bp[key] && acc.push(key), acc), []).join(' ')
}

function generateControllers() {
  for (let _ of APP.staticControllers) {
    classUtils.classConverter(_.template);
    document.addEventListener('loadstart', _.onLoad());
    APP.root.appendChild(_.template);
  }
}

function calcAndAssignBreakpoints() {
  APP.view.bkp = useBreakpoints();
  APP.root.className = useBreakpointsStringify(APP.view.bkp);
}