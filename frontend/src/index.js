import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './style.css';

import HomePage            from "./page_home/HomePage.js"
import LoginPage           from "./page_login/LoginPage.js";
import SignupPage          from "./page_signup/SignupPage.js";
import SettingsPage        from "./page_settings/SettingsPage.js";
import LandingPage         from "./page_landing/LandingPage.js";
import MyMoviesPage        from "./page_mymovies/MyMoviesPage.js";
import NotImplementedPage  from "./page_notimplemented/NotImplementedPage.js";

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/home" element={<HomePage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/signup" element={<SignupPage/>}/>
            <Route path="/settings" element={<SettingsPage/>}/>
            <Route path="/mymovies" element={<MyMoviesPage/>}/>
            <Route path="/notimplemented" element={<NotImplementedPage/>}/>
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);

