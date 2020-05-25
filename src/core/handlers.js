const ImageEditorCore = require('./');
const Utils           = require('./../utils');

/**
 * @this {ImageEditorCore}
 */
function handlers() {
  
  // Utilities initializing for listeners control
  this.addEventListener = (eventName, clb) => {
    if (!this._handlers.has(eventName)) {
      this._handlers.set(eventName, new Array());
    }

    if (this._handlers.get(eventName).indexOf(clb) === -1) {
      this._handlers.get(eventName).push(clb);
    }
  }

  this.hasEventListener = (eventName, clb) => {
    return this._handlers.has(eventName) && this._handlers.get(eventName).indexOf(clb) !== -1;
  }

  this.removeEventListener = (eventName, clb) => {
    if (!this._handlers.has(eventName)) return;
    let index = this._handlers.get(eventName).indexOf(clb);
    if (index !== -1) {
      this._handlers.get(eventName).splice(index, 1);
    }
  }

  this.dispatchEvent = (eventName, event) => {
    if (this._handlers.has(eventName)) {
      this._handlers.get(eventName).forEach(clb => clb(event));
    }
  }
  // ------------------------------


  
  // Setting up listeners
  const getPosition = (event) => {
    // rx, ry - relative position
    let [rx, ry] = Utils.getPositionRelativeToElement(event.clientX, event.clientY, this._outerWrapper);

    // sx, sy - starting position (left top)
    // ex, ey - ending position (right bottom)
    let [sx, sy, ex, ey] = Utils.getZoomAreaCSSDimensions(this._state.zoom, this._eCanvasElement, this._outerWrapper);

    let { x: offsetX, y: offsetY } = this._outerWrapper.getBoundingClientRect();
    // x, y - absolute position to the wrapper
    let x = event.clientX - offsetX;
    let y = event.clientY - offsetY;

    return [...Utils.getPointPositionFromCSS(sx + rx * (ex - sx), sy + ry * (ey - sy), this._state.zoom.pixelRatio), rx, ry, x, y];
  };

  const commonProperties = (event) => ({
    ctrlPressed: event.ctrlPressed,
    shiftPressed: event.shiftPressed,
    altPressed: event.altPressed
  });

  this.addEventListener('mousedown', (event) => {
    if (event.button !== 0) return;

    // px, py - pixel position (real)
    // rx, ry - relative position to the outer wrapper
    let [px, py, rx, ry, x, y] = getPosition(event);

    // Updating cursor information
    this._setState({
      mouse: {
        ...commonProperties(event),
        leftButtonPressed: true,
        pressedPositionX: x,
        pressedPositionY: y,
        pressedRealPositionX: px,
        pressedRealPositionY: py,
        pressedRelativePositionX: rx,
        pressedRelativePositionY: ry,
      }
    });
  });

  this.addEventListener('mousemove', (event) => {
    // px, py - pixel position (real)
    // rx, ry - relative position to the outer wrapper
    let [px, py, rx, ry, x, y] = getPosition(event);

    // Updating cursor information
    this._setState({
      mouse: {
        ...commonProperties(event),
        positionX: x,
        positionY: y,
        realPositionX: px,
        realPositionY: py,
        relativePositionX: rx,
        relativePositionY: ry,
      }
    });
  });

  this.addEventListener('mouseup', (event) => {
    if (event.button !== 0) return;

    // px, py - pixel position (real)
    // rx, ry - relative position to the outer wrapper
    let [px, py, rx, ry, x, y] = getPosition(event);

    // Updating cursor information
    this._setState({
      mouse: {
        ...commonProperties(event),
        leftButtonPressed: false,
        releasedPositionX: x,
        releasedPositionY: y,
        releasedRealPositionX: px,
        releasedRealPositionY: py,
        releasedRelativePositionX: rx,
        releasedRelativePositionY: ry,
      }
    });
  });
  this.addEventListener('keydown', (event) => {
    if (event.keyCode < 256 && !this.pressedKeys[event.keyCode]) {
      this.pressedKeys[event.keyCode] = true;
    }
  });
  this.addEventListener('keyup', (event) => {
    if (event.keyCode < 256 && this.pressedKeys[event.keyCode]) {
      this.pressedKeys[event.keyCode] = false;
    }
  });

  // ------------------------------
  window.addEventListener('keydown', (event) => this.dispatchEvent('keydown', event));
  window.addEventListener('keyup',   (event) => this.dispatchEvent('keyup',   event));
  window.addEventListener('mouseup', (event) => this.dispatchEvent('mouseup', event));
  window.addEventListener('wheel',   (event) => event.ctrlKey && event.preventDefault(), {
    capture: true,
    passive: false
  });
  window.addEventListener('resize', () => this._updateElement());
}

module.exports = handlers;