const MM = .3779527559;

module.exports = {
  /**
   * Convert to pixel size
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
   * Load an image
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
   * Assign one object to another
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
  }
}