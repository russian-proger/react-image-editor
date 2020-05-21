const React = require('react');

const Handlers        = require('./handlers');
const ImageEditorCore = require('./index');
const Utils           = require('./../utils');
const Zoom            = require('./components/zoom');

/**
 * @this {ImageEditorCore}
 */
function Init() {
  this._setState = (newState) => this._state = ({
    zoom: {
      ...this._state.zoom, ...newState.zoom
    }
  });

  this._setStyles = (newStyles) => this._styles = ({
    outer_wrapper: { ...this._styles.outer_wrapper, ...newStyles.outer_wrapper },
    inner_wrapper: { ...this._styles.inner_wrapper, ...newStyles.inner_wrapper },
    canvas:        { ...this._styles.canvas,        ...newStyles.canvas        },
  });

  this.discardChanges = function() {
    this.fContext.drawImage(this._iCanvasElement, 0, 0);
  }

  this.confirmChanges = function() {
    this.iContext.drawImage(this._fCanvasElement, 0, 0);
  }

  this.saveCurrentState = function(arg) {
    if (arg instanceof HTMLCanvasElement) {
  
    } else if (arg instanceof CanvasRenderingContext2D) {
  
    } else {
      console.warn('Function saveCurrentState in ImageEditorCore: argument is invalid -', arg);
    }
  }

  this.restoreInitialImage = function() {
    this.iContext.clearRect(0, 0, _iCanvasElement.width, _iCanvasElement.height);
    this.fillCanvasWithImage(this.iContext);
    this.discardChanges();
  }

  this._init = function() {
    this._fCanvasElement = this._fCanvasElementRef.current;
    this._outerWrapper   = this._outerWrapperRef  .current;
  
    // Receiving contexts
    this.iContext = this._iCanvasElement.getContext('2d');
    this.fContext = this._fCanvasElement.getContext('2d');
  
    // Loading an image
    Utils.loadImage(this._options.initialImageSource).then(image => {
      // Backup the image
      this._image = image;
  
      // Setting width of the canvases
      let options = this._options;
      if (options.canvasSize.width === 'auto') {
        this.iContext.canvas.width = image.width;
        this.fContext.canvas.width = image.width;
      } else {
        this.iContext.canvas.width = options.canvasSize.width;
        this.fContext.canvas.width = options.canvasSize.width;
      }
  
      // Setting height of the canvases
      if (options.canvasSize.height === 'auto') {
        this.iContext.canvas.height = image.height;
        this.fContext.canvas.height = image.height;
      } else {
        this.iContext.canvas.height = options.canvasSize.height;
        this.fContext.canvas.height = options.canvasSize.height;
      }

      this._setState({ zoom: { initialWidth: Math.min(this._iCanvasElement.width, this._outerWrapper.offsetWidth) } });
  
      // Draw the image right on the initial canvas
      this.fillCanvasWithImage(this.iContext);
  
      // Synchronising the both canvases
      this.discardChanges();

      // Loading other components
      Handlers.call(this);
      Zoom.call(this);
    })
  }

  this.fillCanvasWithImage = function(context) {
    let imageWidth  = this._image.width;
    let imageHeight = this._image.height;
  
    // Checking the received argument
    if (!(context instanceof CanvasRenderingContext2D)) {
      throw 'Invalid argument';
    }

    if (this._options.fillMode === 'contain') {
      if (imageWidth > context.canvas.width) {
        imageHeight = imageHeight / imageWidth * context.canvas.width;
        imageWidth  = context.canvas.width;
      }
  
      if (imageHeight > context.canvas.height) {
        imageWidth  = imageWidth / imageHeight * context.canvas.height;
        imageHeight = context.canvas.height;
      }

      context.drawImage(this._image, (context.canvas.width - imageWidth) / 2, (context.canvas.height - imageHeight) / 2, imageWidth, imageHeight);
    } else if (this._options.fillMode === 'cover') {
  
    } else {
      console.warn("`fillMode`: incorrect value was set");
    }
  };

  this.element = () => {
    [this._updatesCount, this._updateElement] = React.useReducer(x => x + 1, 0);
    React.useLayoutEffect(this._init.bind(this), []);

    // Localization some data from parent
    let options = this._options;
    let styles  = this._styles;

    return (
      <div
        ref={ this._outerWrapperRef }
        onWheel={ (event) => this.handlers._onWheel(event) }
        className="outer-canvas-wrapper"
        style={ styles.outer_wrapper }
      >
        <div className="inner-canvas-wrapper" style={{ ...styles.inner_wrapper }}>
          <canvas ref={ this._fCanvasElementRef } width={ options.canvasSize.width } height={ options.canvasSize.height } style={ styles.canvas } />
        </div>
      </div>
    );
  };
}

module.exports = Init;