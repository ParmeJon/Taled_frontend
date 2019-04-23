import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import 'semantic-ui-css/semantic.min.css'
import reducer from './Redux/reducer';
import {createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import thunk from 'redux-thunk'
import ActionCable from 'actioncable';


import { ActionCableProvider } from 'react-actioncable-provider';

export const API_ROOT = 'http://localhost:3000/api/v1';
export const API_WS_ROOT = 'ws://localhost:3000/api/v1/cable';
export const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const cable = ActionCable.createConsumer('ws://localhost:3000/api/v1/cable')
const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
  <ActionCableProvider cable={cable}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </ActionCableProvider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
