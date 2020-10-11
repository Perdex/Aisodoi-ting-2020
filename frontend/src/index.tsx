import React from 'react';
import ReactDOM from 'react-dom';
import { ReactQueryCacheProvider } from "react-query";
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <ReactQueryCacheProvider>
      <App />
    </ReactQueryCacheProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
