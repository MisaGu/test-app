import { classUtils } from '../../utils';
import header from './header.html'
import './header.scss';

export class HeaderController {
  constructor () {
    const el = document.createElement('div');
    el.innerHTML = header;
    this.template = el.firstChild;
  }

  onLoad() {
    this.menuTemplate = this.template.querySelector('.headerModule__menu');

    if (!APP.view.bkp.sm) {
      this.menuTemplate.addEventListener('mouseenter', (e) => {
        classUtils.addClassEffect(this.menuTemplate, 'opened');
      });
      this.menuTemplate.addEventListener('mouseleave', () => {
        classUtils.removeClassEffect(this.menuTemplate, 'opened');
      });
      this.menuTemplate.addEventListener('click', (e) => {
        classUtils.toggleClassEffect(this.menuTemplate, 'opened');
      });
    }
  }
};