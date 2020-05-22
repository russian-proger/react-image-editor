const React = require('react');

const ImageEditorInterface = require('./');

const dom = require('./dom');

/**
 * Initializes instance of the ImageEditorInterface
 * @this {ImageEditorInterface}
 */
function Init() {
  this._init = function() {
    
  }

  this.element = () => {
    [this._updatesCount, this._updateElement] = React.useReducer(x => x + 1, 0);
    React.useLayoutEffect(() => {
      this._init();
    }, []);

    const DOM = dom.bind(this);

    return <DOM />;
  };
}

module.exports = Init;