const ImageEditorCore = require('./');

/**
 * @this {ImageEditorCore}
 */
function handlers() {
  this.handlers = {
    _onWheel: (event) => {
      if (event.ctrlKey === true) {
        // event.preventDefault();
      }
      // console.log(event);
      // console.log(event.offsetX, event.offsetY);

      if (event.deltaY !== 0) {
        if (event.ctrlKey) {
          let boundingClientRect = this._outerWrapper.getBoundingClientRect();
          let offsetX =  2 * (event.clientX - boundingClientRect.x) / this._outerWrapper.offsetWidth  - 1;
          let offsetY = -2 * (event.clientY - boundingClientRect.y) / this._outerWrapper.offsetHeight + 1;
          if (event.deltaY > 0) {
            this.addZoom(1.07, offsetX, offsetY);
          } else if (event.deltaY < 0) {
            this.addZoom(1 / 1.07, offsetX, offsetY);
          }
        } else {
          if (event.shiftKey) {
            this.addOffset((event.deltaY < 0 ? -15 : 15), 0);
          } else {
            this.addOffset(0, (event.deltaY < 0 ? 15 : -15));
          }
        }
      }
      
      if (event.deltaX !== 0) {
        this.addOffset((event.deltaX > 0 ? 15 : -15), 0)
      }
    },
    _onKeyDown: (event) => {
      if (event.keyCode < 256 && !this.pressedKeys[event.keyCode]) {
        console.log(event.keyCode);
        this.pressedKeys[event.keyCode] = true;
      }
    },
    _onKeyUp: (event) => {
      if (event.keyCode < 256 && this.pressedKeys[event.keyCode]) {
        this.pressedKeys[event.keyCode] = false;
      }
    }
  }

  window.addEventListener('keydown', (event) => this.handlers._onKeyDown(event));
  window.addEventListener('keyup',   (event) => this.handlers._onKeyUp  (event));
  window.addEventListener('wheel',   (event) => event.ctrlKey && event.preventDefault(), {
    capture: true,
    passive: false
  });
}

module.exports = handlers;