import './bootstrap';
// import './components/Example';
import React from 'react'
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Router from './router';

if (document.getElementById('app')) {
  const Index = ReactDOM.createRoot(document.getElementById("app"));

  Index.render(
      <React.StrictMode>
        <BrowserRouter>
          <Router/>
        </BrowserRouter>
      </React.StrictMode>
  )
}