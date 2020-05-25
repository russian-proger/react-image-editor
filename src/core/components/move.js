const Constants       = require('./../constants');
const ImageEditorCore = require('./../');
const Utils           = require('./../../utils');

/**
 * @function
 * @this {ImageEditorCore}
 */
function Move() {
  // Initial position
  var initialPivotPositionX, initialPivotPositionY;
  var startCursorPositionX, startCursorPositionY;

  const onMouseDown = () => {
    if (this._state.cursorMode !== Constants.CURSOR_MODE.MOVING) return;

    // Saving current pivot position
    initialPivotPositionX = this._state.zoom.pivotPositionX;
    initialPivotPositionY = this._state.zoom.pivotPositionY;
    startCursorPositionX  = this._state.mouse.positionX;
    startCursorPositionY  = this._state.mouse.positionY;
  }

  const onMouseMove = (event) => {
    if (this._state.cursorMode !== Constants.CURSOR_MODE.MOVING) return;
    if (!this._state.mouse.leftButtonPressed) return;

    let mouseInfo             = this._state.mouse;
    let { pixelRatio: ratio } = this._state.zoom;
    let deltaCSSX =  (startCursorPositionX - mouseInfo.positionX) / this._state.zoom.factor;
    let deltaCSSY = -(startCursorPositionY - mouseInfo.positionY) / this._state.zoom.factor;

    this._setState({
      zoom: {
        pivotPositionX: initialPivotPositionX + deltaCSSX,
        pivotPositionY: initialPivotPositionY + deltaCSSY,
      }
    });

    this._updateZoom();
  }

  // Listening
  this.addEventListener('zoomupdated', (event) => onMouseDown());
  this.addEventListener('mousedown',   (event) => onMouseDown());
  this.addEventListener('mousemove',   (event) => onMouseMove(event));
}

module.exports = Move;