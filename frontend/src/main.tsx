import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import './styles/g-root-cfg.scss'
import './styles/modal.scss'
import {ThemeProvider, ToasterComponent, ToasterProvider} from "@gravity-ui/uikit";
import {Provider} from "react-redux";

import {store} from "./store/store.ts";


const user_store = store();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={user_store}>
          <ThemeProvider theme="light">
              <ToasterProvider>
                  <App />
                  <ToasterComponent />
              </ToasterProvider>
          </ThemeProvider>
      </Provider>
  </React.StrictMode>,
)
