import './bootstrap';
// import './components/Example';
import React from 'react'
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Router from './router';
import store from './app/store';
import { Provider } from 'react-redux';
// import './css/style.css';

if (document.getElementById('app')) {
  const Index = ReactDOM.createRoot(document.getElementById("app"));

  Index.render(
      <React.StrictMode>
        <BrowserRouter>
          <Provider store={store}>
            <Router/>
          </Provider>
        </BrowserRouter>
      </React.StrictMode>
  )
}