import ownerDocument from '/jslib/dom-helpers/ownerDocument.js';

const ownerWindow = (node, fallback = window) => {
  const doc = ownerDocument(node);
  return doc.defaultView || doc.parentView || fallback;
};

export default ownerWindow;