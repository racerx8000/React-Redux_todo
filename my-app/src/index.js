import React from 'react';
import ReactDOM from 'react-dom';
import ColumnContainer from './components/ColumnContainer';
import "./components/App.css"
import store from './redux/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <ColumnContainer />
  </Provider>,
  document.getElementById("root")
)
