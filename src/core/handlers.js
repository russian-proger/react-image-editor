const ImageEditorCore = require('./');

/**
 * @this {ImageEditorCore}
 */
function handlers() {
  this._handlers = {
    onWheel: (event) => {
      if (event.deltaY !== 0) {
        if (event.ctrlKey) {
          let boundingClientRect = this._outerWrapper.getBoundingClientRect();
          let offsetX =  2 * (event.clientX - boundingClientRect.x) / this._outerWrapper.offsetWidth  - 1;
          let offsetY = -2 * (event.clientY - boundingClientRect.y) / this._outerWrapper.offsetHeight + 1;
          if (event.deltaY > 0) {
            this.addZoom(1 / 1.07, offsetX, offsetY);
          } else if (event.deltaY < 0) {
            this.addZoom(1.07, offsetX, offsetY);
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
    },
    onKeyDown: (event) => {
      if (event.keyCode < 256 && !this.pressedKeys[event.keyCode]) {
        this.pressedKeys[event.keyCode] = true;
      }
    },
    onKeyUp: (event) => {
      if (event.keyCode < 256 && this.pressedKeys[event.keyCode]) {
        this.pressedKeys[event.keyCode] = false;
      }
    }
  }

  window.addEventListener('keydown', (event) => this._handlers.onKeyDown(event));
  window.addEventListener('keyup',   (event) => this._handlers.onKeyUp  (event));
  window.addEventListener('wheel',   (event) => event.ctrlKey && event.preventDefault(), {
    capture: true,
    passive: false
  });
}

module.exports = handlers;