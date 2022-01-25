import { render } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MainApp } from '.';
import ProductListings from './components/MainApp';
import { store } from './redux/store';

it('renders main app without crashing', () => {
  // currently breaking. Please fix by wrapping in
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <MainApp />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('render product', () => {
  render(<ProductListings />);
});
