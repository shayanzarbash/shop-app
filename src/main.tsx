import './index.css';
import React from 'react';
import App from './App.tsx';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import store from './redux/app/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
)
