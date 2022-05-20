import React, {Component} from "react";
import {Link} from "react-router-dom";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {withRouter} from "../tools/WithRouter";

import RsrcIconArrowLeft from "../resources/icon_arrow_left.svg";
import FHeaderAlt from "../components/FHeaderAlt.js";
import FFooter from "../components/FFooter.js";
import SolidAuthService from "../services/solid.auth.service";
import {handleIncomingRedirect} from "@inrupt/solid-client-authn-browser";


const required = value => {
    if (!value) {
        return (<div className="rgb-alert" role="alert">This field is required!</div>);
    }
};

class SolidLogin extends Component {

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeURL = this.onChangeURL.bind(this);
        this.state = {url: "", message: ""};
    }

    onChangeURL(e) {
        this.setState({url: e.target.value});
    }

    handleLogin(e) {
        SolidAuthService.login(this.state.url);
    }

    render() {
        return (
            <div className="h-100 d-flex flex-column m-3 m-xxl-0">
                <FHeaderAlt/>
                <main className="mt-5 mb-auto container-fluid">
                    <div className="d-lg-flex justify-content-around align-items-center">
                        <div className="col-lg-7">
                            <div className="mt-5 d-flex mb-3">
                                <img src={RsrcIconArrowLeft} width="12px" className="me-2"/>
                                <Link to="/">Back to landingpage</Link>
                            </div>
                            <h1>Solid Log In</h1>
                            <hr/>
                            <div className="mb-4">
                                <div className="FForm d-lg-flex mb-3 align-items-baseline">
                                    <label className="form-label col-2 rgb-2 ffw-2 " htmlFor="username">Solid
                                        url*</label>
                                    <input type="text" className="FFormInput w-100" name="solidUrl"
                                           value={this.state.url} onChange={this.onChangeURL}/>
                                </div>
                            </div>

                            <button type='button' className="btn rgb-bg-solid rgb-1 btn-block"
                                    disabled={this.state.loading} onClick={this.handleLogin}>
                                {this.state.loading && (<span className="spinner-border spinner-border-sm"/>)}
                                <div className="d-flex align-items-center justify-content-center">
                                    <img className="me-1" src="https://genr.eu/wp/wp-content/uploads/2018/10/logo.svg"
                                         width="18px"/>
                                    Continue
                                </div>
                            </button>


                            {this.state.message && (
                                <div className="form-group">
                                    <div className="py-2 rgb-alert" role="alert">{this.state.message}</div>
                                </div>)}
                        </div>
                    </div>
                </main>
                <FFooter/>
            </div>
        );
    }
}

export default withRouter(SolidLogin);
