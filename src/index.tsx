import React from 'react';
import ReactDOM from 'react-dom/client';
import './stylesheets/index.css';
import App from './App';
import rootReducer from './modules';
import { createStore } from 'redux';
import { devToolsEnhancer } from '@redux-devtools/extension';
import { Provider } from 'react-redux';

const store = createStore(rootReducer, undefined, devToolsEnhancer({}));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);