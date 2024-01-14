import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App';
import './index.module.scss';

const root = document.getElementById('root');

if (!root) {
  throw new Error('root not found');
}

createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
