import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from '../App';
import initStore from '../store';
import 'semantic-ui-css/semantic.min.css';
import {BrowserRouter} from "react-router-dom";

const store = initStore();

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
