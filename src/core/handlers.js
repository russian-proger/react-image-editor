const ImageEditorCore = require('./');

/**
 * @this {ImageEditorCore}
 */
function handlers() {
  
  // Utilities initializing for listeners control
  this.addEventListener = (eventName, clb) => {
    if (!this._handlers.has[eventName]) {
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


  // Keyboard listening
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
  window.addEventListener('wheel',   (event) => event.ctrlKey && event.preventDefault(), {
    capture: true,
    passive: false
  });
  window.addEventListener('resize', () => this._updateElement());
}

module.exports = handlers;