/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import RouterComponent from './src/components/Router';
import reducers from './src/reducers';
import {createStore, applyMiddleware} from 'redux';

const store = createStore(reducers, {}, applyMiddleware(thunk));

const App = () => {
  return (
    <Provider store={store}>
      <RouterComponent />
    </Provider>
  );
};

export default App;
