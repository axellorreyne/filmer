import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import './style.css';

import LandingPage from './page_landing/LandingPage';
import HomePage    from './page_home/HomePage';

ReactDOM.render(
    <React.StrictMode>
        <HomePage/>
    </React.StrictMode>,
    document.getElementById('root')
);

