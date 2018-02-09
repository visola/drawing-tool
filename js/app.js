import { Provider } from 'mobx-react';
import React from 'react';
import { render } from 'react-dom';

import Application from './components/Application';
import stores from './stores';

const { drawables, drawingProperties, selection, tools } = stores;
tools.loadTools(drawables, drawingProperties, selection);

const ApplicationWithState = () => (
  <Provider {...stores}>
    <Application />
  </Provider>
);

render(<ApplicationWithState />, document.getElementById('container'));
