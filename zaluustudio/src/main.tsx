import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Application root was not found.');
}

root.replaceChildren();
createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
