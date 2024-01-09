import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './components/App';

const root = document.getElementById('root');

if (!root) {
  throw new Error('root not found');
}

createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
