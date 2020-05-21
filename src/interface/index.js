const React = require('react');

const ImageEditorCore = require('./../core');
const useOptions = require('./options');

module.exports = function ImageEditorInterface(props) {
  const options  = useOptions(props);
  const [IECore] = React.useState(new ImageEditorCore(options));
  React.useEffect(() => console.log(IECore), []);

  return (
    <div className="image-editor" style={{ ...options.cssSize }}>
      <IECore.element />
    </div>
  );
}