import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  makeSelect_mode,
  makeSelect_isDrawing,
  makeSelect_ui,
} from './selectors';
import Menu from '../menu';

const fabric = require('fabric').fabric;
window.fabric = fabric;

let canvas;

class WhiteBoard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const canvasEL = document.createElement('canvas');
    canvasEL.setAttribute('id', 'c');
    document.getElementById('canvas').appendChild(canvasEL);
    canvas = window.__canvas = new window.fabric.Canvas('c', {
      isDrawingMode: true,
      width: window.innerWidth,
      height: window.innerHeight,
    });
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions.bind(this));

    canvas.on('mouse:wheel', opt => {
      const delta = opt.e.deltaY;
      let zoom = canvas.getZoom();
      zoom += delta / 200;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;
      canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });
    canvas.on('mouse:down', opt => {
      const { mode } = this.props;
      canvas.isDrawingMode = mode === 'Pen';

      const evt = opt.e;
      if (evt.altKey === true) {
        canvas.isDrawingMode = false;
        canvas.isDragging = true;
        canvas.selection = false;
        canvas.lastPosX = evt.clientX;
        canvas.lastPosY = evt.clientY;
        console.log(canvas.lastPosX, canvas.lastPosY);
      }
    });
    canvas.on('mouse:move', opt => {
      if (canvas.isDragging) {
        const e = opt.e;
        canvas.viewportTransform[4] += e.clientX - canvas.lastPosX;
        canvas.viewportTransform[5] += e.clientY - canvas.lastPosY;
        canvas.requestRenderAll();
        canvas.lastPosX = e.clientX;
        canvas.lastPosY = e.clientY;
      }
    });
    canvas.on('mouse:up', opt => {
      canvas.isDragging = false;
      canvas.selection = true;
      const { mode } = this.props;
      console.log(mode);
      canvas.isDrawingMode = mode === 'Pen';
    });
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this));
  }

  updateDimensions() {
    canvas.setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    canvas.calcOffset();
    canvas.renderAll();
  }

  serialize() {}

  render() {
    return (
      <div>
        <Menu serialize={this.serialize.bind(this)} />
        <div id="canvas" />
      </div>
    );
  }
}

const mapStateToProps = createSelector(
  makeSelect_mode(),
  makeSelect_isDrawing(),
  makeSelect_ui(),
  (mode, isDrawing, ui) => ({ mode, isDrawing, ui }),
);

export default connect(mapStateToProps)(WhiteBoard);

// https://www.google.com/url?sa=j&url=https%3A%2F%2Fmyviewboard.com%2F&uct=1505066474&usg=M_9ZgYDJHoN4JMuUPX8phY1rErY.
// https://apis.google.com/additnow/u/0/l?applicationid=11040883588&__ls=ogb&__lu=https://myviewboard.com
