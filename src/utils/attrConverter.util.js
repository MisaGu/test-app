export function $attrConverter(node, registerDOM) {
  // convert reserved attributes to HTMLElement attributes
  if (node.nodeType == 1) {
    const cloneNode = node.cloneNode();
    const cloneAttr = Object.keys(cloneNode.attributes).reduce((acc, key) =>
      (acc[cloneNode.attributes[key].name] = cloneNode.attributes[key].value, acc), {});

    Object.keys(APP.config.attributesMap).forEach((rAttr) => {
      if (cloneAttr[rAttr]) {
        switch (true) {
          case ['svg', 'polygon', 'polyline', 'g'].indexOf(node.tagName) != -1:
            node.setAttribute(APP.config.attributesMap[rAttr].attr, cloneAttr[rAttr]);
            break;
          default:
            node[APP.config.attributesMap[rAttr].param] = cloneAttr[rAttr];
        }

        const attrEffect = APP.config.attributesMap[rAttr].effect;
        if (attrEffect) attrEffect(node, cloneAttr[rAttr])
        node.removeAttribute(rAttr);

        if (registerDOM) APP.state.shadowDOM.set(node, cloneAttr);
      }
    });
  }
  node = node.firstChild;
  while (node) {
    $attrConverter(node, registerDOM);
    node = node.nextSibling;
  }
}