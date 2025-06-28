import React from 'react';
import ReactDOM from 'react-dom/client'; // This is the crucial line for createRoot
import App from './App'; // Make sure App.js or App.jsx exists and is correctly imported
import './index.css'; // Or './index.css' if that's where your main CSS is

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)