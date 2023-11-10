import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './resets.css';
import AuthProvider from "./components/Auth/AuthProvider";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
