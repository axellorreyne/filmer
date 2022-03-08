import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
import './style.css';

import LandingPage from './page_landing/LandingPage';
// import HomePage    from './page_home/HomePage';

ReactDOM.render(
  <React.StrictMode>
    <LandingPage/>
  </React.StrictMode>,
  document.getElementById('root')
);

