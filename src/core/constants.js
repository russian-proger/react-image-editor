module.exports = {
  STATE: {
    initialCSS: () => ({
      outer_wrapper: {},
      inner_wrapper: {},
      canvas: {}
    }),
    
    initialCoreState: () => ({
      zoom: {
        initialWidth: 0,
        offsetX: 0,
        offsetY: 0,
        factor:  1
      },
      mouse: {
        positionX: 0,
        positionY: 0,
        ctrlPressed: false,
        shiftPressed: false,
        altPresed: false
      }
    }),
  },
  CURSOR_MODE: {
    MOVING: 'MOVING'
  }
}