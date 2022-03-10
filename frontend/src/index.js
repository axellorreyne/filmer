import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {Routes, Route, Link} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';
import './style.css';

import LandingPage from './landing_page/LandingPage';
import LoginPage from "./account/LoginPage";
import SignupPage from "./account/SignupPage";
import ProfilePage from "./account/ProfilePage";

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/signup" element={<SignupPage/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);

