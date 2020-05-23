const React = require('react');

require('./style.sass');
const Constants = require('./constants');
const Init      = require('./init');

/**
 * @constructor
 * @param {object} options
 * @returns {React.ElementType}
 */
function ImageEditorCore(options) {
  // Private properties //
  /**
   * Unique id generating with instace of this object
   * @property
   * @private
   * @type {Number} key
   */
  this._id = parseInt(Math.random() * 1000000);

  /**
   * Options of the editor
   * @property
   * @private
   * @type {Object} options
   */
  this._options = Object.create(options);

  /**
   * First canvas wrapper
   * @property
   * @private
   * @type {HTMLDivElement}
   */
  this._outerWrapper = null;

  /**
   * Reference to the first wrapper
   * @property
   * @private
   * @type {React.RefObject}
   */
  this._outerWrapperRef = React.useRef();

  /**
   * Styles for the dom elements
   * @property
   * @private
   * @type {Object}
   */
  this._styles = Constants.initialCSS();

  /**
   * Contains some data
   * @property
   * @private
   * @type {Object}
   */
  this._state  = Constants.initialCoreState();

  /**
   * Initial canvas element
   * @property
   * @private
   * @type {HTMLCanvasElement}
   */
  this._iCanvasElement = document.createElement('canvas');

  /**
   * Final canvas element
   * @property
   * @private
   * @type {HTMLCanvasElement}
   */
  this._eCanvasElement = null;

  /**
   * Reference of the final result canvas
   * @property
   * @private
   * @type {React.RefObject}
   */
  this._eCanvasElementRef = React.useRef(null);

  /**
   * Final canvas element
   * @property
   * @private
   * @type {HTMLCanvasElement}
   */
  this._cCanvasElement = null;

  /**
   * Reference of the final result canvas
   * @property
   * @private
   * @type {React.RefObject}
   */
  this._cCanvasElementRef = React.useRef(null);

  /**
   * Contains event handlers
   * @property
   * @private
   * @type {Object}
   */
  this._handlers = null;

  /**
   * Count of the updates
   * @property
   * @private
   * @type {Number}
   */
  this._updatesCount;

  /**
   * Initial image
   * @property
   * @private
   * @type {Image}
   */
  this._image;



  // Public properties //
  /**
   * Context of the initial canvas
   * @property
   * @public
   * @type {CanvasRenderingContext2D}
   */
  this.iContext = null;

  /**
   * Context of the final canvas
   * @property
   * @public
   * @type {CanvasRenderingContext2D}
   */
  this.eContext = null;

  /**
   * Context of the covering canvas
   * @property
   * @public
   * @type {CanvasRenderingContext2D}
   */
  this.cContext = null;

  /**
   * Set of the pressed keys
   * @property
   * @public
   * @type {Array}
   */
  this.pressedKeys = new Array(256).fill(false);



  // Private Methods //
  /**
   * Initializes an instance
   * @method
   * @private
   */
  this._init = null;

  /**
   * Updates the DOM element
   * @method
   * @private
   */
  this._updateElement = null;

  /**
   * Updates Zoom-component
   * @method
   * @private
   */
  this._updateZoom = null;

  /**
   * Updates instance state
   * @method
   * @private
   */
  this._setState = null;

  /**
   * Updates styles
   * @method
   * @private
   */
  this._setStyles = null;



  // Public Methods //
  /**
   * Increases zoom area following the cursor
   * @method
   * @public
   * @param {Number} factor
   * @param {Number} x
   * @param {Number} y
   */
  this.addZoom = null;

  /**
   * "Moves" the inner wrapper relative to the outer
   * @method
   * @public
   * @param {Number} x
   * @param {Number} y
   */
  this.addOffsetPivotPosition = null;

  /**
   * Save changes to the initial canvas
   * @method
   * @public
   */
  this.confirmChanges = null;

  /**
   * Save changes from first canvas to the initial
   * @method
   * @public
   */
  this.discardChanges = null;

  /**
   * @method
   * @public
   * @returns {React.DetailedReactHTMLElement}
   */
  this.element = null;

  /**
   * Draw an image on the canvas with a certain mode
   * @method
   * @public
   * @param {CanvasRenderingContext2D} context
   * @todo write `cover` mode
   */
  this.fillCanvasWithImage = null;

  /**
   * Renders external canvas
   * @method
   * @public
   */
  this.renderExternalCanvas = null;

  /**
   * Restore initial image
   * @method
   * @public
   */
  this.restoreInitialImage = null;

  /**
   * Save current changes to actions list
   * @method
   * @public
   * @param {HTMLCanvasElement|CanvasRenderingContext2D}
   * @todo write this method
   */
  this.saveCurrentState = null;

  Init.call(this);
}

module.exports = ImageEditorCore;