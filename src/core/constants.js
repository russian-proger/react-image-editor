module.exports = {
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
    }
  }),
}