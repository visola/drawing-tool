import AbstractTool from './AbstractTool';

export default class ColorPickerTool extends AbstractTool {
  get fillColor() {
    if (this.selection.empty) {
      return this.drawingProperties.fillColor;
    }
    return this.selection.drawables[0].fill;
  }

  get strokeColor() {
    if (this.selection.empty) {
      return this.drawingProperties.strokeColor;
    }
    return this.selection.drawables[0].stroke;
  }

  setFillColor(newColor) {
    if (this.selection.empty) {
      this.drawingProperties.fillColor = newColor;
    } else {
      this.selection.drawables[0].fill = newColor;
    }
    this.emit('done');
  }

  setStrokeColor(newColor) {
    if (this.selection.empty) {
      this.drawingProperties.strokeColor = newColor;
    } else {
      this.selection.drawables[0].stroke = newColor;
    }
    this.emit('done');
  }
}
