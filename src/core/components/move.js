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

  const onMouseDown = (event) => {
    if (this._state.cursorMode !== Constants.CURSOR_MODE.MOVING) return;

    // Saving current pivot position
    initialPivotPositionX = this._state.zoom.pivotPositionX;
    initialPivotPositionY = this._state.zoom.pivotPositionY;
  }

  const onMouseMove = (event) => {
    if (this._state.cursorMode !== Constants.CURSOR_MODE.MOVING) return;
    if (!this._state.mouse.leftButtonPressed) return;
    let mouseInfo             = this._state.mouse;
    let { pixelRatio: ratio } = this._state.zoom;
    let deltaCSSX = (mouseInfo.pressedPositionX - mouseInfo.positionX) / ratio;
    let deltaCSSY = (mouseInfo.pressedPositionY - mouseInfo.positionY) / ratio;
    this._setState({
      zoom: {
        pivotPositionX: initialPivotPositionX + deltaCSSX,
        pivotPositionY: initialPivotPositionY + deltaCSSY,
      }
    });
    this._updateZoom();
  }

  // Listening
  this.addEventListener('mousedown', (event) => onMouseDown(event));
  this.addEventListener('mousemove', (event) => onMouseMove(event));
}

module.exports = Move;