import React, { Component } from "react";
import {Link} from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../services/auth.service";
import {withRouter} from "../tools/WithRouter";

import RsrcIconArrowLeft from "../resources/icon_arrow_left.svg";
import FHeaderAlt from "../components/FHeaderAlt.js";
import FFooter    from "../components/FFooter.js";

const required = value => 
{
  if (!value) {
    return(<div className="rgb-alert" role="alert">This field is required!</div>);
  }
};

const email = value => 
{
  if (!isEmail(value)) 
  {
    return(<div className="rgb-alert" role="alert">This is not a valid email.</div>);
  }
};

const vusername = value => 
{
  if (value.length < 3 || value.length > 20) 
  {
    return ( <div className="rgb-alert" role="alert"> 
        The username must be between 3 and 20 characters. </div>);
  }
};

const vpassword = value => 
{
  if (value.length < 8 || value.length > 40) 
  {
    return (<div className="rgb-alert" role="alert"> 
        The password must be between 8 and 40 characters. </div>
    );
  }
};

class SignupPage extends Component 
{

  constructor(props) 
  {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.state = {username: "", email: "", password: "", successful: false, message: ""};
  }
  
  onChangeUsername(e) 
  {
    this.setState({username: e.target.value});
  }
  
  onChangeEmail(e) 
  {
    this.setState({ email: e.target.value });
  }

  onChangePassword(e) 
  {
    this.setState({ password: e.target.value });
  }

  handleRegister(e) 
  {
    e.preventDefault();
    this.setState({ message: "", successful: false });
    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) 
    {
      AuthService.register( this.state.username, this.state.email, this.state.password).then(
        response => 
        {
          this.setState({ message: response.data.message, successful: true });
          AuthService.login(this.state.username, this.state.password).then(
              () => 
              {
                  this.props.navigate("/home");
                  window.location.reload();
              },
              error => 
              {
                  const resMessage = (error.response && error.response.data && error.response.data.detail) || (error.response && error.response.data) || error.message || error.toString();
                  this.setState({successful: false, message: resMessage});
              }
          );
        },
        error => 
        {
          const resMessage = (error.response && error.response.data && error.response.data.username) || (error.response && error.response.data) || error.message || error.toString();
          this.setState({ successful: false, message: resMessage });
        }
      );
    }
  }

  render() 
  {
    return (
<div className="h-100 d-flex flex-column m-3 m-xxl-0">
    <FHeaderAlt/>
    <main className="mt-5 mb-auto container-fluid">
        <div className="d-lg-flex justify-content-around align-items-center">
          <Form className="col-lg-7" onSubmit={this.handleRegister} ref={c => { this.form = c; }} >
            <div className="d-flex mb-3">
              <img src={RsrcIconArrowLeft} width="12px" className="me-2"/>
              <Link to="/">Back to landingpage</Link>
            </div>
            <h1>Create Account</h1>
            <hr/>
            {!this.state.successful && (
              <div>
                <div className="mb-4">
                    <div className="FForm d-lg-flex mb-3 align-items-center">
                      <label className="form-label col-2 rgb-2 ffw-2" htmlFor="username">Username</label>
                      <Input type="text" className="FFormInput w-100" name="username" value={this.state.username} 
                            onChange={this.onChangeUsername} validations={[required, vusername]} />
                    </div>
                    <div className="FForm d-lg-flex mb-3 align-items-center">
                      <label className="form-label col-2 rgb-2 ffw-2" htmlFor="email">Email</label>
                      <Input type="text" className="FFormInput w-100" name="email" value={this.state.email}
                            onChange={this.onChangeEmail} validations={[required, email]} />
                    </div>
                    <div className="FForm d-lg-flex mb-3 align-items-center">
                      <label className="form-label col-2 rgb-2 ffw-2" htmlFor="password">Password</label>
                      <Input type="password" className="FFormInput w-100" name="password" value={this.state.password} 
                         onChange={this.onChangePassword} validations={[required, vpassword]} />
                    </div>
                </div>
                <div className="form-group">
                  <button className="btn btn-primary btn-block">Sign Up</button>
                </div>
              </div>
            )}
            {this.state.message && (
              <div className="form-group">
                <div className={ this.state.successful ? "alert alert-success" : "py-2 rgb-alert" } role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton style={{ display: "none" }} ref={c => { this.checkBtn = c; }} />
            <div className="mt-5 d-flex">
              <p className="me-3">Already have an account?</p> 
              <Link to="/login">Log in</Link>
            </div>
          </Form>
        </div>
    </main>
    <FFooter/>
</div>
    );
  }
}

export default withRouter(SignupPage)
