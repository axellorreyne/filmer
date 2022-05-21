import React, {Component} from "react";
import Form from "react-validation/build/form";
import {Link} from "react-router-dom";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import {withRouter} from "../tools/WithRouter";

import FHeaderAlt from "../components/FHeaderAlt.js";
import RsrcIconArrowLeft from "../resources/icon_arrow_left.svg";
import FFooter    from "../components/FFooter.js";


const required = value => {
    if (!value) 
    {
        return (<div className="rgb-alert" role="alert">This field is required!</div>);
    }
};

class Login extends Component {
    
    constructor(props) 
    {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.state = {username: "", password: "", loading: false, message: ""};
    }

    onChangeUsername(e) 
    {
        this.setState({username: e.target.value});
    }

    onChangePassword(e) 
    {
        this.setState({password: e.target.value});
    }

    handleLogin(e) 
    {
        e.preventDefault();
        this.setState({message: "", loading: true});
        this.form.validateAll();
        if (this.checkBtn.context._errors.length === 0) 
        {
            AuthService.login(this.state.username, this.state.password).then(
                () => 
                {
                    this.props.navigate("/home");
                    window.location.reload();
                },
                error => 
                {
                    const resMessage = (error.response && error.response.data && error.response.data.detail) || (error.response && error.response.data) || error.message || error.toString();
                    this.setState({loading: false, message: resMessage});
                }
            );
        } 
        else 
        {
            this.setState({loading: false});
        }
    }

    render() 
    {
        return (
<div className="h-100 d-flex flex-column m-3 m-xxl-0">
    <FHeaderAlt/>
    <main className="mt-5 mb-auto container-fluid">
        <div className="d-lg-flex justify-content-around align-items-center">
            <Form className="col-lg-7" onSubmit={this.handleLogin} ref={c => {this.form = c;}}>
                <div className="d-flex mb-3">
                  <img src={RsrcIconArrowLeft} width="12px" className="me-2"/>
                  <Link to="/">Back to landingpage</Link>
                </div>
                <h1>Log In</h1>
                <hr/>
                <div className="mb-4"> 
                    <div className="FForm d-lg-flex mb-3 align-items-center">
                        <label className="form-label col-2 rgb-2 ffw-2" htmlFor="username">Username</label>
                        <Input type="text" className="FFormInput w-100" name="username" value={this.state.username} onChange={this.onChangeUsername} validations={[required]}/>
                    </div>
                    <div className="FForm d-lg-flex align-items-center">
                        <label className="form-label col-2 rgb-2 ffw-2" htmlFor="password">Password</label>
                        <Input type="password" className="FFormInput w-100" name="password" value={this.state.password} onChange={this.onChangePassword} validations={[required]} />
                    </div>
                </div> 
                <div className="form-group">
                    <button className="btn btn-primary btn-block" disabled={this.state.loading} >
                        {this.state.loading && ( <span className="spinner-border spinner-border-sm"/>)}
                        <span>Login</span>
                    </button>
                </div>
                {this.state.message && ( 
                    <div className="form-group">
                        <div className="py-2 rgb-alert" role="alert">{this.state.message}</div>
                    </div>)}
                <CheckButton style={{display: "none"}} ref={c => { this.checkBtn = c; }} />
              <div className="mt-5 d-flex">
                <p className="me-3">Don't have account?</p> 
                <Link to="/signup">Sign up</Link>
              </div>
            </Form>
        </div>
    </main>
    <FFooter/>
</div>
        );
    }
}

export default withRouter(Login);
