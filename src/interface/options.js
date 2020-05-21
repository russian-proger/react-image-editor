const React = require('react');
const Utils = require('./../utils');

module.exports = function useOptions(_options) {
  const [options, _setOptions] = React.useState((() => {
    let cssWidth   = (_options.cssSize.width  ?? {}) ?? 'auto';
    let cssHeight  = (_options.cssSize.height ?? {}) ?? 'auto';
    let canvasSize = (_options.canvasSize     ?? {});
    return {
      canvasSize: Utils.getSizeInPixels({ width: canvasSize.width ?? 'auto', height: canvasSize.height ?? 'auto' }, canvasSize.unit ?? 'pixels'),
      initialImageSource: _options.initialImage ?? null,
      fillMode: _options.fillMode ?? "cover",
      cssSize: {
        width:  typeof cssWidth  === 'number' ? `${ cssWidth  }px` : cssWidth,
        height: typeof cssHeight === 'number' ? `${ cssHeight }px` : cssHeight,
      }
    }
  })());
  return options;
}