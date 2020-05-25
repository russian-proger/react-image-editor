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
    let ix = this._state.zoom.pivotPositionX;
    let iy = this._state.zoom.pivotPositionY;
    let pr = this._state.zoom.pixelRatio;

    let ef = Math.min(Math.max(cf * df, 30 / iw), pr * 30);

    // Calculating pivot's position by cursor's
    let { width: wi, height: hi } = this._outerWrapper.getBoundingClientRect();
    let rx = wi / cf * (_rx - _rx / (ef / cf)) / 2;
    let ry = hi / cf * (_ry - _ry / (ef / cf)) / 2;

    if (cf !== ef) {
      this._setState({ zoom: { factor: ef, pivotPositionX: ix + rx, pivotPositionY: iy + ry, pixelView: ef >= pr * 3 } });
    }

    this.dispatchEvent('zoomupdated', {});
    this._updateZoom();
  }

  this.addOffsetPivotPosition = function(px, py) {
    let { pivotPositionX: ix, pivotPositionY: iy, factor: fc } = this._state.zoom;
    this._setState({ zoom: { pivotPositionX: ix + px / fc, pivotPositionY: iy + py / fc } });
    this._updateZoom();
  }

  this._updateZoom = function() {
    let zoomOptions = this._state.zoom;
    let eCanvas = this._eCanvasElement;
    this._setStyles({
      inner_wrapper: {
        width: zoomOptions.initialWidth * zoomOptions.factor,
        height: zoomOptions.initialWidth * zoomOptions.factor * (eCanvas.height / eCanvas.width),
        left: (zoomOptions.initialWidth / 2 - zoomOptions.pivotPositionX) * zoomOptions.factor,
        bottom: (zoomOptions.initialWidth / 2 * (this._eCanvasElement.height / this._eCanvasElement.width) - zoomOptions.pivotPositionY) * zoomOptions.factor,
        imageRendering: zoomOptions.pixelView ? 'pixelated' : 'auto',
        backgroundImage: zoomOptions.factor > zoomOptions.pixelRatio * 10 ? 'none' : undefined
      }
    });
    this._updateElement();
  };
  // ------------------------------


  // Listeners for zooming
  const onWheel = (event) => {
    if (event.deltaY !== 0) {
      if (event.ctrlKey) {
        let boundingClientRect = this._outerWrapper.getBoundingClientRect();
        // rx, ry - relative position
        let rx =  2 * (event.clientX - boundingClientRect.x) / this._outerWrapper.offsetWidth  - 1;
        let ry = -2 * (event.clientY - boundingClientRect.y) / this._outerWrapper.offsetHeight + 1;
        if (event.deltaY > 0) {
          this.addZoom(1 / 1.14, rx, ry);
        } else if (event.deltaY < 0) {
          this.addZoom(1.14, rx, ry);
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