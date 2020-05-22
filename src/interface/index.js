const React = require('react');

const Init            = require('./init');
const ImageEditorCore = require('./../core');
const useOptions      = require('./options');

/**
 * Interface of the image editor
 * @constructor
 * @prop {Object} properties
 */
function ImageEditorInterface(props) {
  /**
   * Editor options
   * @property
   * @private
   * @type {Object}
   */
  this._options  = useOptions(props);

  /**
   * Instance of the Editor core
   * @property
   * @private
   * @type {ImageEditorCore}
   */
  this._IECore = React.useState(new ImageEditorCore(this._options))[0];

  /**
   * React element
   * @method
   * @public
   * @returns {React.DetailedReactHTMLElement}
   */
  this.element = null;

  Init.call(this);
}

module.exports = ImageEditorInterface;