import { registerRootComponent } from 'expo';
import React from 'react';
import moment from 'moment';
import 'moment/locale/ru';

import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from './app/app';
import rootReducer from './store/reducers/root-reducer';
import { createAPI } from './services/api';

moment.locale(`ru`);

const api = createAPI();

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
  ),
);

const Index = () => (
  <Provider store={store}>
    <App/>
  </Provider>
);

registerRootComponent(Index);
