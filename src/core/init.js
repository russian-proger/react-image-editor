const React = require('react');

const ExternalCanvas  = require('./external-canvas');
const Handlers        = require('./handlers');
const ImageEditorCore = require('./index');
const Utils           = require('./../utils');
const Zoom            = require('./components/zoom');

/**
 * @this {ImageEditorCore}
 */
function Init() {
  this._init = function() {
    // Receiving DOM elements
    this._eCanvasElement = this._eCanvasElementRef.current;
    this._cCanvasElement = this._cCanvasElementRef.current;
    this._outerWrapper   = this._outerWrapperRef  .current;
  
    // Receiving contexts
    this.iContext = this._iCanvasElement.getContext('2d');
    this.eContext = this._eCanvasElement.getContext('2d');
    this.cContext = this._cCanvasElement.getContext('2d');
  
    // Loading an image
    Utils.loadImage(this._options.initialImageSource).then(image => {
      // Backup the image
      this._image = image;
  
      // Setting width of the canvases
      let options = this._options;
      if (options.canvasSize.width === 'auto') {
        this.iContext.canvas.width = image.width;
        this.eContext.canvas.width = image.width;
      } else {
        this.iContext.canvas.width = options.canvasSize.width;
        this.eContext.canvas.width = options.canvasSize.width;
      }
  
      // Setting height of the canvases
      if (options.canvasSize.height === 'auto') {
        this.iContext.canvas.height = image.height;
        this.eContext.canvas.height = image.height;
      } else {
        this.iContext.canvas.height = options.canvasSize.height;
        this.eContext.canvas.height = options.canvasSize.height;
      }

      // Setting zoom state
      this._setState({ zoom: { initialWidth: Math.min(this._iCanvasElement.width, this._outerWrapper.offsetWidth - 20, (this._outerWrapper.offsetHeight - 20) * (this._iCanvasElement.width / this._iCanvasElement.height)) } });
  
      // Drawing the image right on the initial canvas
      this.fillCanvasWithImage(this.iContext);
  
      // Synchronising the both canvases
      this.copyToEditable();

      // Loading other components
      Handlers.call(this);
      Zoom.call(this);
      ExternalCanvas.call(this);
    })
  }

  this._setState = (newState) => Utils.assignObject(this._state, newState);

  this._setStyles = (newStyles) => Utils.assignObject(this._styles, newStyles);

  this.copyToEditable = () => this.eContext.drawImage(this._iCanvasElement, 0, 0);

  this.copyToInitial = () => this.iContext.drawImage(this._eCanvasElement, 0, 0);

  this.fillCanvasWithImage = function(context) {
    // Checking the received argument
    if (!(context instanceof CanvasRenderingContext2D)) {
      throw 'Invalid argument';
    }

    // Receiving some from the initial image
    let imageWidth  = this._image.width;
    let imageHeight = this._image.height;

    if (this._options.fillMode === 'contain') {
      // `Contain` fill mode
      // Set up image dimensions
      if (imageWidth > context.canvas.width) {
        imageHeight = imageHeight / imageWidth * context.canvas.width;
        imageWidth  = context.canvas.width;
      }  
      if (imageHeight > context.canvas.height) {
        imageWidth  = imageWidth / imageHeight * context.canvas.height;
        imageHeight = context.canvas.height;
      }

      // Drawing the image
      context.drawImage(this._image, (context.canvas.width - imageWidth) / 2, (context.canvas.height - imageHeight) / 2, imageWidth, imageHeight);
    } else if (this._options.fillMode === 'cover') {
      // `Cover` fill mode

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

    const external_canvas_width  = (this._outerWrapper ?? {}).offsetWidth  ?? 100;
    const external_canvas_height = (this._outerWrapper ?? {}).offsetHeight ?? 100;

    React.useLayoutEffect(() => {
      // Rendering the external canvas
      this.renderExternalCanvas && this.renderExternalCanvas();
    }, [external_canvas_width, external_canvas_height]);

    return (
      <div
        ref={ this._outerWrapperRef }
        className="canvas-outer-wrapper"
        style={ styles.outer_wrapper }

        onClick={     (event) =>  this.dispatchEvent && this.dispatchEvent('click',     event) }
        onMouseMove={ (event) =>  this.dispatchEvent && this.dispatchEvent('mousemove', event) }
        onWheel={     (event) =>  this.dispatchEvent && this.dispatchEvent('wheel',     event) }
      >
        <div className="canvas-inner-wrapper" style={{ ...styles.inner_wrapper }}>
          <canvas ref={ this._eCanvasElementRef }
            className="main-canvas"
            style={ styles.canvas }
            width={ options.canvasSize.width }
            height={ options.canvasSize.height }
          />
        </div>
        <div className="external-canvas-inner-wrapper">
          <canvas ref={ this._cCanvasElementRef }
            key={ `${ this._id }:external-canvas` }
            className="external-canvas"
            width ={ external_canvas_width  }
            height={ external_canvas_height }
          />
        </div>
      </div>
    );
  };

  this.restoreInitialImage = function() {
    this.iContext.clearRect(0, 0, _iCanvasElement.width, _iCanvasElement.height);
    this.fillCanvasWithImage(this.iContext);
    this.discardChanges();
  }

  this.saveCurrentState = function(arg) {
    if (arg instanceof HTMLCanvasElement) {
  
    } else if (arg instanceof CanvasRenderingContext2D) {
  
    } else {
      console.warn('Function saveCurrentState in ImageEditorCore: argument is invalid -', arg);
    }
  }

  this.setCursorMode = function(newCursorMode) {
    if (Object.keys(Constants.CURSOR_MODE).indexOf(newCursorMode) !== -1) {
      this._cursorMode = newCursorMode;
    }
  }
}

module.exports = Init;