import './ownerDocument.js'

export default function ownerWindow(node) {
  var doc = (0, _ownerDocument2.default)(node);
  return doc && doc.defaultView || doc.parentWindow;
}