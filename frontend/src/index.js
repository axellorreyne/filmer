import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {Routes, Route, Link} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';
import './style.css';
import HomePage from './page_home/HomePage'
import LoginPage from "./account/LoginPage";
import SignupPage from "./account/SignupPage";
import ProfilePage from "./account/ProfilePage";
import LandingPage from "./page_landing/LandingPage";

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/home" element={<HomePage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/signup" element={<SignupPage/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);

