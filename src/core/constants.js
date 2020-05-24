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
        pressedPositionX: 0,
        pressedPositionY: 0,
        releasedPositionX: 0,
        releasedPositionY: 0,
        positionX: 0,
        positionY: 0,
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