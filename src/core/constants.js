module.exports = {
  STATE: {
    initialCSS: () => ({
      outer_wrapper: {},
      inner_wrapper: {},
      canvas: {}
    }),
    
    initialCoreState: () => ({
      cursorMode: 'MOVING',
      zoom: {
        pixelRatio: 1,
        initialWidth: 0,
        pivotPositionX: 0,
        pivotPositionY: 0,
        pixelView: false,
        factor:  1,
      },
      mouse: {
        // Pressed position
        pressedPositionX: 0,
        pressedPositionY: 0,
        pressedRealPositionX: 0,
        pressedRealPositionY: 0,
        pressedRelativePositionX: 0,
        pressedRelativePositionY: 0,
        // Released position
        releasedPositionX: 0,
        releasedPositionY: 0,
        releasedRealPositionX: 0,
        releasedRealPositionY: 0,
        releasedRelativePositionX: 0,
        releasedRelativePositionY: 0,
        // Current position
        positionX: 0,
        positionY: 0,
        realPositionX: 0,
        realPositionY: 0,
        relativePositionX: 0,
        relativePositionY: 0,
        // Others...
        leftButtonPressed: false,
        ctrlPressed: false,
        shiftPressed: false,
        altPressed: false
      },
      mainColor: 'black',
      secondaryColor: 'white',
    }),
  },
  CURSOR_MODE: {
    MOVING: 'MOVING'
  }
}