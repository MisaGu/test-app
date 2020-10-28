import {
  $generateTemplate,
  $classUtils
} from '$utils';
import graph from './graph.html';
import './graph.scss';

export const GraphController = (function () {
  const _opt = {
      width: Math.min(1200, window.innerWidth),
      height: Math.min(300, window.innerWidth / 16 * 9),
      offset: {
        l: 30,
        b: 20,
        r: 20,
        t: 0
      },
      maxValue: 0,
      scale: 0.9,
      pointLabels: [],
      values: [],
      points: [],
      vSteps: 8,
      grid: [],
      chartSize: () => ({
        width: _opt.width - _opt.offset.l - _opt.offset.r,
        height: _opt.height - _opt.offset.b - _opt.offset.t
      })
    },
    _el = {
      chart: null,
      polygon: null,
      polyline: null,
      lines: [],
      labels: [],
      points: [],
    }

  // Global props
  this.template = $generateTemplate(graph);

  // Global functions
  this.onInit = function () {
    _el.chart = this.template.querySelector('.graphWrapper__chart');
    _el.polygon = this.template.querySelector('.graphWrapper__chart__polygon');
    _el.polyline = this.template.querySelector('.graphWrapper__chart__polyline');
    _el.gridLines = this.template.querySelector('.graphWrapper__chart__gridLines');
    _el.gridLabels = this.template.querySelector('.graphWrapper__chart__gridLabels');
    _el.pointLabels = this.template.querySelector('.graphWrapper__chart__pointLabels');

    this.createChart([5, 8, 17, 13, 26, 2, 9, 5, 20]);
  }

  this.onLoad = function () {
    window.addEventListener('resize', () => {
      _opt.width = Math.min(1200, window.innerWidth);
      _opt.height = Math.min(300, window.innerWidth / 16 * 9);
      this.createChart()
    })
  }

  this.createChart = function (values) {
    if (values) {
      _opt.values = values;
      _opt.maxValue = Math.ceil(Math.max.apply(null, values));
    }

    if (_opt.values.length > 1) {
      calcPoints();
      calcGridLines();
      drawGridLines();
      drawGridLabels();
      drawPointLabels();

      _el.chart.setAttribute("viewBox", "0 0 " + _opt.width + " " + _opt.height);
      _el.polygon.setAttribute("points", _opt.points.join(' '));
      _el.polyline.setAttribute("points", _opt.points.slice(1, -1).join(' '));
    }
  }

  this.render = function () {
    APP.state.main.insertBefore(this.template, APP.state.main.firstChild);
  }

  // Private functions
  function calcPoints() {
    _opt.points = [];

    if (_opt.values.length > 1) {
      _opt.points.push(`${_opt.offset.l},${_opt.chartSize().height}`);

      const steps = (_opt.chartSize().width) / (_opt.values.length - 1);
      for (let x = 0; x < _opt.values.length; x++) {
        const px = (steps * x) + _opt.offset.l;
        const py = (_opt.chartSize().height - (_opt.chartSize().height * (_opt.values[x] / _opt.maxValue) * _opt.scale))
        _opt.points.push(`${px.toFixed(2)},${py.toFixed(2)}`);
      }

      _opt.points.push(`${_opt.width - _opt.offset.r},${_opt.chartSize().height}`);
    }
  }

  function calcGridLines() {
    _opt.grid = [];

    const n = _opt.chartSize().height / _opt.vSteps;
    for (let x = 0; x <= _opt.vSteps; x++) {
      _opt.grid.push(_opt.chartSize().height - n * x * _opt.scale);
    }
    _opt.grid.reverse();
  }

  function drawGridLines() {
    for (let x = 0; x < _opt.grid.length; x++) {
      const _line = _el.lines[x] || document.createElementNS('http://www.w3.org/2000/svg', 'line');
      if (!_el.lines[x]) {
        _line.setAttribute('class', `${APP.state.shadowDOM.get(_el.gridLines).sd_class}__line`);
        _line.setAttribute('x1', _opt.offset.l - 10);

        _el.lines.push(_line);
        _el.gridLines.appendChild(_line);
      }

      _line.setAttribute('y1', _opt.grid[x]);
      _line.setAttribute('x2', _opt.width - _opt.offset.r + 10);
      _line.setAttribute('y2', _opt.grid[x]);
    }
  }

  function drawGridLabels() {
    for (let x = 0; x < _opt.grid.length; x++) {
      const _text = _el.labels[x] || document.createElementNS('http://www.w3.org/2000/svg', 'text');
      if (!_el.labels[x]) {
        _text.setAttribute('class', `${APP.state.shadowDOM.get(_el.gridLabels).sd_class}__text`);
        _text.setAttribute('x', 0);
        _text.textContent = x !== _opt.grid.length - 1 ?
          _opt.maxValue - Math.floor(_opt.maxValue * (_opt.grid[x] / _opt.height) * _opt.scale) :
          0;

        _el.labels.push(_text);
        _el.gridLabels.appendChild(_text);
      }

      _text.setAttribute('y', _opt.grid[x] + 3);
    }
  }

  function drawPointLabels() {
    const steps = (_opt.chartSize().width) / (_opt.values.length - 1);
    for (let x = 0; x < _opt.values.length; x++) {
      const _text = _el.points[x] || document.createElementNS('http://www.w3.org/2000/svg', 'text');
      if (!_el.points[x]) {
        _text.setAttribute('class', `${APP.state.shadowDOM.get(_el.pointLabels).sd_class}__text`);
        _text.setAttribute('text-anchor', 'middle');
        _text.textContent = _opt.values[x];

        _el.points.push(_text);
        _el.pointLabels.appendChild(_text);
      }

      _text.setAttribute('y', _opt.height);
      _text.setAttribute('x', (steps * x) + _opt.offset.l);
    }
  }
})