import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {Routes, Route, Link} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './style.css';

import HomePage     from './page_home/HomePage'
import LoginPage    from "./page_login/LoginPage";
import SignupPage   from "./page_signup/SignupPage";
import SettingsPage from "./page_settings/SettingsPage";
import LandingPage  from "./page_landing/LandingPage";
import MyMoviesPage  from "./page_mymovies/MyMoviesPage";

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/home" element={<HomePage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/signup" element={<SignupPage/>}/>
            <Route path="/settings" element={<SettingsPage/>}/>
            <Route path="/mymovies" element={<MyMoviesPage/>}/>
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);

