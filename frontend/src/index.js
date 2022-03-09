import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';
import './style.css';

import LandingPage from './page_landing/LandingPage.js';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

