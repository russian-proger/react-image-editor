const React = require('react');

module.exports = function ImageEditor(_props) {
  return (
    <div className="image-editor" style={{ ...this._options.cssSize }}>
      <this._IECore.element />
    </div>
  );
}