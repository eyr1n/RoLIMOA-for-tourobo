import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Provider } from 'react-redux';
import { configureRoLIMOAStore } from '@rolimoa/common/redux';
import App from './App';

const store = configureRoLIMOAStore();

const container = document.getElementById('root');
// biome-ignore lint/style/noNonNullAssertion: <explanation>
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        <Provider store={store}>
          <App />
        </Provider>
      </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>,
);
