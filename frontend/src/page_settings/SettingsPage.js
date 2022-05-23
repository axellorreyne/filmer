import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import SolidUserService from "../services/solid.user.service"

import FFooter from "../components/FFooter.js";
import FHeader from "../components/FHeader";
import {SessionContext} from "@inrupt/solid-ui-react";

function requiredValidationTest(value)
{
  return((value) ? undefined : 
    (<div className="rgb-alert" role="alert">This field is required!</div>));
}

function passwordValidationTest(value)
{
  return((value.length == 0 || (value.length >= 8 && value.length <= 40)) ? undefined : 
    (<div className="rgb-alert" role="alert"> 
      The password must be between 8 and 40 characters. 
    </div>));
}

function emailValidationTest(value)
{
  return((value.length == 0 || isEmail(value)) ? undefined : 
    (<div className="rgb-alert" role="alert">This is not a valid email.</div>));
}

class Profile extends Component {

  static contextType = SessionContext;

  constructor(props) 
  {
    super(props);
    this.buttonSetStateUsername = this.buttonSetStateUsername.bind(this);
    this.buttonSetStateEmail = this.buttonSetStateEmail.bind(this);
    this.buttonSetStatePassword = this.buttonSetStatePassword.bind(this);
    this.buttonSetStateCurrentPassword = this.buttonSetStateCurrentPassword.bind(this);
    this.patchUser = this.patchUser.bind(this);
    this.state =
      {
        username: "",
        password: "",
        email: "",
        loading: false,
        message: "",
        currentUsername: "",
        currentEmail: "",
        currentPassword: "",
      }
  } 

  // TODO (Elias): get username and email from browser storage and update 
  // browser storage when the patch request is succesfull
  componentDidMount() 
  {

    if(SolidUserService.isSolidUser(this.context.session)) {
      SolidUserService.getUserInfo(this.context.session).then(data=>{
        this.setState({username:data.name,password:data.oidcIssuer})
      })
    }
      document.title = "Filmer: Settings";
    UserService.getUser().then((data) => {
      this.setState({
        currentUsername: data.username,
        currentEmail: data.email,
      });
    });
  }

  buttonSetStateUsername(button)
  {
    this.setState({username: button.target.value}) 
  }
  
  buttonSetStateEmail(button)
  {
    this.setState({email: button.target.value}) 
  }
  
  buttonSetStatePassword(button)
  {
    this.setState({password: button.target.value}) ;
  }

  buttonSetStateCurrentPassword(button)
  {
    this.setState({currentPassword: button.target.value}) ;
  }

  patchUser(form)
  {
    form.preventDefault();
    this.setState({message: "", loading: true})
    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) 
    {
      AuthService.login(this.state.currentUsername, this.state.currentPassword).then(
        () => 
        {
          UserService.updateUser(this.state.username, this.state.email, this.state.password).then(
            () => 
            {
              window.location.reload()
            },
            error =>
            {
              const response = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
              this.setState({loading: false, message: response});
            }
          )
        },
        error => 
        {
          const response = error.response
          let message = "";
          switch (response.status) 
          {
            case (401):
              message = "You entered a wrong password";
              break;
            default:
              message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          }
          this.setState({loading: false, message: message});
        }
      )
    }
    else 
    {
      this.setState({loading: false});
    }
  }
 
  render() {
    let rendered;
    if(!SolidUserService.isSolidUser(this.context.session)){
      rendered=
          <div>
            <p className="rgb-1 ffs-3 ffw-2">Fill in the fields you want to update</p>
            <Form onSubmit={this.patchUser} ref={form => this.form = form}>
              <div>
                <div className="mb-5">
                  <div className="FForm d-lg-flex mb-3 align-items-baseline">
                    <label className="form-label col-2 rgb-2 ffw-2" htmlFor="username">New Username</label>
                    <Input type="text" className="FFormInput w-100" name="new-username"
                           value={this.state.username} onChange={this.buttonSetStateUsername}/>
                  </div>
                  <div className="FForm d-lg-flex mb-3 align-items-baseline">
                    <label className="form-label col-2 rgb-2 ffw-2" htmlFor="email">New Email</label>
                    <Input type="text" className="FFormInput w-100" name="new-email"
                           value={this.state.email} onChange={this.buttonSetStateEmail} validations={[emailValidationTest]}/>
                  </div>
                  <div className="FForm d-lg-flex mb-3 align-items-baseline">
                    <label className="form-label col-2 rgb-2 ffw-2" htmlFor="password">New Password</label>
                    <Input type="password" className="FFormInput w-100" name="new-password"
                           value={this.state.password} onChange={this.buttonSetStatePassword} validations={[passwordValidationTest]}/>
                  </div>
                </div>
                <p className="rgb-1 ffs-3 ffw-2">Enter your password</p>
                <div className="FForm d-lg-flex mb-3 align-items-baseline mb-5">
                  <label className="form-label col-2 rgb-2 ffw-2" htmlFor="password">Current Password</label>
                  <Input type="password" className="FFormInput w-100" name="current-password"
                         value={this.state.currentPassword} onChange={this.buttonSetStateCurrentPassword} validations={[requiredValidationTest]}/>
                </div>
                <div className="form-group">
                  <button className="btn btn-primary btn-block" disabled={this.state.loading} >
                    {this.state.loading && <span className="spinner-border spinner-border-sm"/>}
                    {!this.state.loading && <span>Save</span>}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <div className="py-2 rgb-alert" role="alert">
                  {this.state.message}
                </div>
              </div>
              <CheckButton style={{ display: "none" }} ref={c => { this.checkBtn = c; }} />
            </Form>
          </div>
    }else{
      rendered=
          <div>
            <p className="rgb-2"> Disclaimer: Since you are logged in with Solid, your account settings cannot be managed here</p>
            <div className="row mt-5 ">
              <div className="col-3">
                <h2 className="rgb-2"> Nickname: </h2>
              </div>
              <div className="col-2">
                <h2> {this.state.username}</h2>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-3">
                <h2 className="rgb-2"> OidcIssuer:</h2>
              </div>
              <div className="col-2">
                <h2> {this.state.password}</h2>
              </div>
            </div>
          </div>
    }
    return (
<div className="h-100 d-flex flex-column m-3 m-xxl-0">
  <FHeader/>
  <main className="mb-5 container-fluid">
    <div className="my-5 d-lg-flex justify-content-around align-items-center">
      <div className="col-lg-7 mx-md-5 mb-5" >
        <p className="ffs-1 ffw-2 m-0 p-0 me-4">Settings</p>
        <hr/> 
        {rendered}
      </div>
    </div>
  </main>
  <FFooter/>
</div>
        );
    }
}

export default Profile;
