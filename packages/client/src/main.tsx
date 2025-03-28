import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { configureRoLIMOAStore } from '@rolimoa/common/redux';
import { AppMuiThemeProvider } from './AppMuiThemeProvider.tsx';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/noto-sans-jp/300.css';
import '@fontsource/noto-sans-jp/400.css';
import '@fontsource/noto-sans-jp/500.css';
import '@fontsource/noto-sans-jp/700.css';
import 'dseg/css/dseg.css';

const store = configureRoLIMOAStore();

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <AppMuiThemeProvider>
      <BrowserRouter>
        <RecoilRoot>
          <Provider store={store}>
            <App />
          </Provider>
        </RecoilRoot>
      </BrowserRouter>
    </AppMuiThemeProvider>
  </StrictMode>,
);
