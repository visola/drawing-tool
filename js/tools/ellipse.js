(function (canvas, drawingProperties, selections, tools) {
  let ellipse;
  let initialX, initialY;

  function onMouseDown(event) {
    const boundingRect = event.target.getBoundingClientRect();
    const { left, top } = boundingRect;

    initialX = event.clientX;
    initialY = event.clientY;

    ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
    ellipse.setAttribute('rx', '0');
    ellipse.setAttribute('ry', '0');
    ellipse.setAttribute('cx', initialX - left);
    ellipse.setAttribute('cy', initialY - top);

    ellipse.setAttribute('fill', drawingProperties.fillColor);
    ellipse.setAttribute('stroke', drawingProperties.strokeColor);
    ellipse.setAttribute('stroke-width', 1);

    canvas.addElement(ellipse);
    selections.setSelection(ellipse);
  }

  function onMouseDrag(event) {
    let newWidth = event.clientX - initialX;
    if (newWidth < 0) {
      newWidth = -1 * newWidth;
    }

    let newHeight = event.clientY - initialY;
    if (newHeight < 0) {
      newHeight = -1 * newHeight;
    }

    ellipse.setAttribute('ry', newHeight);
    ellipse.setAttribute('rx', newWidth);
  }

  function onMouseUp() {
    tools.activate('selectTransform');
  }

  tools.register('ellipse', {
    onMouseDown,
    onMouseDrag,
    onMouseUp,
  });
})(canvas, drawingProperties, selections, tools);
