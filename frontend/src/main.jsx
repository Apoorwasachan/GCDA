
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // includes @tailwind base/components/utilities
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><App /></React.StrictMode>
);
