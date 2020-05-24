const ImageEditorCore = require('./../');

/**
 * @function
 * @this {ImageEditorCore}
 */
function Zoom() {
  // Public methods initializing
  this.addZoom = function(df=1.05, _rx=0, _ry=0) {
    let cf = this._state.zoom.factor;
    let iw = this._state.zoom.initialWidth;
    let ix = this._state.zoom.offsetX;
    let iy = this._state.zoom.offsetY;

    let ef = Math.min(Math.max(cf * df, 30 / iw), 10);
    let { width: wi, height: hi } = this._outerWrapper.getBoundingClientRect();
    let rx = wi / cf * (_rx - _rx / (ef / cf)) / 2;
    let ry = hi / cf * (_ry - _ry / (ef / cf)) / 2;

    if (cf !== ef) {
      this._setState({ zoom: { factor: ef, offsetX: ix + rx, offsetY: iy + ry } });
    }
    this._updateZoom();
  }

  this.addOffsetPivotPosition = function(px, py) {
    let { offsetX: ix, offsetY: iy, factor: fc } = this._state.zoom;
    this._setState({ zoom: { offsetX: ix + px / fc, offsetY: iy + py / fc } });
    this._updateZoom();
  }

  this._updateZoom = function() {
    let zoomOptions = this._state.zoom;
    this._setStyles({ inner_wrapper: { width: zoomOptions.initialWidth * zoomOptions.factor, left: -zoomOptions.offsetX * zoomOptions.factor, bottom: -zoomOptions.offsetY * zoomOptions.factor } });
    this._updateElement();
  };
  // ------------------------------


  // Listeners for zooming
  const onWheel = (event) => {
    if (event.deltaY !== 0) {
      if (event.ctrlKey) {
        let boundingClientRect = this._outerWrapper.getBoundingClientRect();
        let offsetX =  2 * (event.clientX - boundingClientRect.x) / this._outerWrapper.offsetWidth  - 1;
        let offsetY = -2 * (event.clientY - boundingClientRect.y) / this._outerWrapper.offsetHeight + 1;
        if (event.deltaY > 0) {
          this.addZoom(1 / 1.14, offsetX, offsetY);
        } else if (event.deltaY < 0) {
          this.addZoom(1.14, offsetX, offsetY);
        }
      } else {
        if (event.shiftKey) {
          this.addOffsetPivotPosition((event.deltaY < 0 ? -15 : 15), 0);
        } else {
          this.addOffsetPivotPosition(0, (event.deltaY < 0 ? 15 : -15));
        }
      }
    }
    
    if (event.deltaX !== 0) {
      this.addOffsetPivotPosition((event.deltaX > 0 ? 15 : -15), 0)
    }
  };
  // ------------------------------

  this.addEventListener('wheel', onWheel);
  this._updateZoom();
}

module.exports = Zoom;