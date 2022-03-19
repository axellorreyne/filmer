import React, { Component } from "react";

import FFooter from "../components/FFooter.js";
import FHeader from "../components/FHeader";


class Profile extends Component {

    render() {
        return (
<div className="h-100 d-flex flex-column m-3 m-xxl-0">
    <FHeader/>
    <main className="mt-auto mb-5 ffw-3 ffs-2 d-flex justify-content-center align-items-center">
        <p className="rgb-alert mb-5">🚧 - This page is under construction! - 🚧</p>
    </main>
    <FFooter/>
</div>
        );
    }
}

export default Profile;
