const ImageEditorCore = require('./../');

/**
 * @function
 * @this {ImageEditorCore}
 */
function Zoom() {
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

  this._updateZoom();
}

module.exports = Zoom;