import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {App} from './App.tsx'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import {configureRoLIMOAStore} from "@rolimoa/common/redux"

const store = configureRoLIMOAStore();

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
          <RecoilRoot>
            <Provider store={store}>
              <App />
            </Provider>
          </RecoilRoot>
        </BrowserRouter>
  </StrictMode>,
)
