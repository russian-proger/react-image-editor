const MM = .3779527559;

module.exports = {
  /**
   * Converts to pixel size
   * @param {Object} size 
   * @param {String} unit
   * @returns {Object} converted size
   */
  getSizeInPixels(size, unit) {
    switch (unit) {
      case "pixel": {
        return size;
      }
      case "mm": {
        return { width: size.width * MM, height: size.height * MM };
      }
      case "cm": {
        return { width: size.width * MM * 100, height: size.height * MM * 100 };
      }
      case "m": {
        return { width: size.width * MM * 10000, height: size.height * MM * 10000 };
      }
      default: {
        console.warning("The measure was set incorrectly. Default `pixels` were set");
        return size;
      }
    }
  },

  /**
   * Loads an image
   * @param {String|Image} src
   * @returns {Image}
   */
  loadImage(src) {
    return new Promise((resolve, rejecct) => {
      if (src instanceof Image) {
        resolve(src);
      } else if (typeof src === 'string') {
        let image = new Image();
        image.onload = () => resolve(image);
        image.src = src;
      }
    })
  },

  /**
   * Assigns one object to another
   * @param {Object} sourceObject
   * @param {Object} assignObject
   * @returns {Object} sourceObject
   */
  assignObject(sourceObject, assignObject) {
    for (let [key, value] of Object.entries(assignObject)) {
      if (typeof value == 'object') {
        if (typeof sourceObject[key] === 'object') {
          arguments.callee(sourceObject[key], value);
        } else {
          sourceObject[key] = value;
        }
      } else {
        sourceObject[key] = value;
      }
    }

    return sourceObject;
  },

  /**
   * Gets a position of the cursor relative to an element
   * @param {Number} posX
   * @param {Number} posY
   * @param {HTMLElement} element
   * @returns {Array<Number>}
   */
  getPositionRelativeToElement(posX, posY, element) {
    let { x: ex, y: ey, width: ew, height: eh } = element.getBoundingClientRect();
    return [(posX - ex) / ew, (posY - ey) / eh];
  },

  /**
   * Gets element visible dimensions by the zoom state
   * @param {Object} zoomState
   * @param {HTMLCanvasElement} canvas
   * @param {HTMLElement} element
   * @returns {Array<Number>}
   */
  getZoomAreaCSSDimensions(zoomState, canvas, element) {
    let { width, height } = element.getBoundingClientRect();
    let k = canvas.height / canvas.width;
    var sx = (zoomState.pivotPositionX - width  / 2 / zoomState.factor + zoomState.initialWidth     / 2);
    var sy = (zoomState.pivotPositionY + height / 2 / zoomState.factor + zoomState.initialWidth * k / 2);
    var ex = (zoomState.pivotPositionX + width  / 2 / zoomState.factor + zoomState.initialWidth     / 2);
    var ey = (zoomState.pivotPositionY - height / 2 / zoomState.factor + zoomState.initialWidth * k / 2);
    return [sx, sy, ex, ey];
  },

  /**
   * Converts CSS position to real
   * @param {Number} CSSposX
   * @param {Number} CSSposY
   * @param {Number} ratio
   * @returns {Array<Number>}
   */
  getPointPositionFromCSS(CSSposX, CSSposY, ratio) {
    return [CSSposX * ratio, CSSposY * ratio];
  }
}