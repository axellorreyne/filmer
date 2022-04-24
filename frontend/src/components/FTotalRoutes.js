import React, {Component} from 'react';
import {Route,Routes,BrowserRouter} from "react-router-dom";

import UserService from '../services/user.service'

import LandingPage from "../page_landing/LandingPage";
import HomePage from "../page_home/HomePage";
import LoginPage from "../page_login/LoginPage";
import SignupPage from "../page_signup/SignupPage";
import SettingsPage from "../page_settings/SettingsPage";
import MyMoviesPage from "../page_mymovies/MyMoviesPage";
import FriendsPage from "../page_friends/FriendsPage";
import NotImplementedPage from "../page_notimplemented/NotImplementedPage";
import SolidLoginPage from "../page_solidlogin/SolidLoginPage";
import RoomPage from "../page_room/RoomPage";

class FTotalRoutes extends Component {

    constructor(probs) {
        super(probs);
        this.state = {logged:false}
    }

    check(page){
        UserService.getAuthTest().then(x=>{
            const logged = x!==undefined && x!=="failed"
            if(logged!==this.state.logged)
                this.setState({logged})
        })
        if(this.state.logged)
            return page
        else
            return <LandingPage/>
    }

    render() {

        return <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LandingPage/>}/>
                        <Route path="/home" element={this.check(<HomePage/>)}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/signup" element={<SignupPage/>}/>
                        <Route path="/settings" element={this.check(<SettingsPage/>)}/>
                        <Route path="/mymovies" element={this.check(<MyMoviesPage/>)}/>
                        <Route path="/friends" element={<FriendsPage/>}/>
                        <Route path="/notimplemented" element={<NotImplementedPage/>}/>
                        <Route path="/solidlogin" element={<SolidLoginPage/>}/>
                        <Route path="/room" element={<RoomPage/>}/>
                    </Routes>
                </BrowserRouter>
    }

}
export default FTotalRoutes
