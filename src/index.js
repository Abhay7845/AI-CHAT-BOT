import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "./App.css"
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'tippy.js/dist/tippy.css';
import 'react-toastify/dist/ReactToastify.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
reportWebVitals();
