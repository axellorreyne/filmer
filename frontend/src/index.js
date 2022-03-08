import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';
import './style.css';

import LandingPage from './landing_page/LandingPage';
import Test from './Test';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/test" element={<Test/>}/>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

