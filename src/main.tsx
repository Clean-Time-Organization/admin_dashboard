import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './resets.css';
import AuthProvider from "./components/Auth/AuthProvider";
import {Provider} from "react-redux";
import store from "./store/store";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </StrictMode>,
)
