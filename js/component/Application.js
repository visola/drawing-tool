import { observer } from 'mobx-react';
import React from 'react';

import Canvas from './Canvas';
import Drawables from '../stores/Drawables';
import Rectangle from '../models/Rectangle';
import ColorPicker from './ColorPicker';

const SVG_MIME_TYPE = 'image/svg+xml';

@observer
export default class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawables: new Drawables(),
      selected: null,
      svg: null,
    };
  }

  handleAddRect() {
    const drawables = this.state.drawables;
    const index = drawables.length + 1;
    const rect = new Rectangle();
    rect.x = index * 10;
    rect.y = index * 10
    rect.height = 100;
    rect.width = 100;
    drawables.push(rect);
  }

  handleDropDrawable(rect, {x, y}) {
    const loadedRect = this.state.drawables.find(rect.id);
    loadedRect.x = x;
    loadedRect.y = y;
  }

  handleDrawableSelected(drawable) {
    this.setState({ selected: drawable });
  }

  handleFillColorChange(newColor) {
    this.state.selected.fill = newColor;
  }

  handleStrokeColorChange(newColor) {
    this.state.selected.stroke = newColor;
  }

  handleSvgContentChanged(svg) {
    if (this.state.svg == svg) {
      return;
    }
    this.setState({ svg });
  }

  render() {
    return (
      <div>
        <div className="toolbar">
          <button className="btn btn-default" onClick={this.handleAddRect.bind(this)}>
            <span className="glyphicon glyphicon-stop"></span>
          </button>
          {this.renderDownloadLink()}
          {this.renderControlsForSelected()}
        </div>
        <Canvas
          onDrawableSelected={this.handleDrawableSelected.bind(this)}
          onDrop={this.handleDropDrawable.bind(this)}
          onSvgContentChange={this.handleSvgContentChanged.bind(this)}
          drawables={this.state.drawables} />
      </div>
    );
  }

  renderDownloadLink() {
    if (this.state.svg == null) {
      return null;
    }

    const bb = new Blob([this.state.svg], {type: SVG_MIME_TYPE});
    return <a
      className="btn btn-default"
      download="drawing.svg"
      href={window.URL.createObjectURL(bb)}
    >
      <span className="glyphicon glyphicon-download-alt"></span>
    </a>;
  }

  renderControlsForSelected() {
    const { selected } = this.state;
    if (!selected) {
      return null;
    }

    return [
      <ColorPicker key="fill" color={selected.fill} onColorChange={this.handleFillColorChange.bind(this)} />,
      <ColorPicker key="stroke" color={selected.stroke} onColorChange={this.handleStrokeColorChange.bind(this)} />,
    ];
  }
}
