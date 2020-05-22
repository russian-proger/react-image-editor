const React = require('react');
const ReactDOM = require('react-dom');

const ImageEditorInterface  = require('./interface');

function ImageEditor(props) {
  const [ImageEditor] = React.useState(new ImageEditorInterface(props));
  React.useLayoutEffect(() => console.log(ImageEditor), []);

  return (
    <ImageEditor.element />
  )
}

function Example() {

  return (
    <ImageEditor
      initialImage={ "./favicon.ico" }
      fillMode={ "contain" }
      cssSize={{
        width: '100vw',
        height: '100vh'
      }}
      canvasSize={{
        width: 1920,
        height: 1080,
        unit: "pixel"
      }}
    />
  )
}

ReactDOM.render(<Example />, document.getElementById('root'));

module.exports = ImageEditor;