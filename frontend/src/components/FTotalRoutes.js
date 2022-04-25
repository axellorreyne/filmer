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
import SearchMoviesPage from "../page_searchmovies/SearchMoviesPage";
import FHeader from "./FHeader";
import FFooter from "./FFooter";
import RoomPage from "../page_room/RoomPage";
import RoomHubPage from "../page_roomhub/RoomHubPage";

class FTotalRoutes extends Component {

    constructor(probs) {
        super(probs);
        this.state = {logged:0}
    }

    check(page){
        UserService.getAuthTest().then(x=>{
            if(this.state.logged===0)
                this.setState({logged:(x!==undefined && x!=="failed")?1:-1})
        })
        if(this.state.logged===1)
            return page
        else if(this.state.logged===-1) {
            console.log("whyyyy")
            return <LandingPage/>
        }
        else
            return <div className="container h-100 d-flex flex-column align-items-center">
              <FHeader/>
              <div className="mb-auto mt-auto text-center">
                <span className="spinner-border spinner-border-sm me-3"/>
              </div>
              <FFooter/>
            </div>
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
                        <Route path="/notimplemented" element={<NotImplementedPage/>}/>
                        <Route path="/solidlogin" element={<SolidLoginPage/>}/>
                        <Route path="/searchmovies" element={this.check(<SearchMoviesPage/>)}/>
                        <Route path="/solidlogin" element={<SolidLoginPage/>}/>
                        <Route path="/room" element={<RoomPage/>}/>
                        <Route path="/roomhub" element={<RoomHubPage/>}/>
                    </Routes>
                </BrowserRouter>
    }

}
export default FTotalRoutes
