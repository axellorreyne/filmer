import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
import './style.css';

import LandingPage from './landing_page/LandingPage';

ReactDOM.render(
  <React.StrictMode>
    <LandingPage/>
  </React.StrictMode>,
  document.getElementById('root')
);

