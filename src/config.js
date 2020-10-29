import {
  $classUtils
} from '$utils';
import {
  HeaderController,
  GraphController,
  SidebarController,
  ArtistListController
} from './components';

export const config = Object.freeze({
  /**
   * @param reservedAttributes convert shadow attributes into HTMLElement attributes
   * @param gridBreakpoints list of UI grid breakpoints
   */
  config: {
    attributesMap: {
      sd_class: {
        param: 'className',
        attr: 'class'
      },
      sd_class_modifier: {
        effect: (node, val) => {
          $classUtils.addClassModifier(node, val)
        }
      }
    },
    gridBreakpoints: {
      xs: 0,
      sm: 480,
      md: 768,
      lg: 1024
    },
    controllers: [
      new HeaderController(),
      new GraphController(),
      new SidebarController(),
      new ArtistListController()
    ]
  },

  /**
   * @param root element to which the APP will be unload
   * @param shadowDOM list of generated elements linked with original template elements 
   */
  state: {
    root: document.getElementById('root'),
    main: document.getElementById('main'),
    side: document.getElementById('side'),
    shadowDOM: new Map(),
    view: {
      bkp: {}
    },
  }
})