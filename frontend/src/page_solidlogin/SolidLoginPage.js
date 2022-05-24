import React, {Component} from "react";
import {Link} from "react-router-dom";
import {withRouter} from "../tools/WithRouter";
import {LoginButton} from "@inrupt/solid-ui-react";
import RsrcIconArrowLeft from "../resources/icon_arrow_left.svg";
import FHeaderAlt from "../components/FHeaderAlt.js";
import FFooter from "../components/FFooter.js";

class SolidLogin extends Component {


    constructor(props) {
        super(props);
        this.onChangeURL = this.onChangeURL.bind(this);
        this.state = {oidcIssuer: "https://broker.pod.inrupt.com", message: ""};
    }

    onChangeURL(e) {
        //const url = e.target.value.split('/')
        //this.setState({oidcIssuer: url[0] + "//" + url[2]});\
        this.setState({oidcIssuer: e.target.value});
    }

    render() {
        return (
            <div className="h-100 d-flex flex-column m-3 m-xxl-0">
                <FHeaderAlt/>
                <main className="mt-5 mb-auto container-fluid">
                    <div className="d-lg-flex justify-content-around align-items-center">
                        <div className="col-lg-7">
                            <div className="mt-5 d-flex mb-3">
                                <img src={RsrcIconArrowLeft} width="12px" className="me-2" alt=""/>
                                <Link to="/">Back to landingpage</Link>
                            </div>
                            <h1>Solid Log In</h1>
                            <hr/>
                            <div className="mb-4">
                                <div className="FForm d-lg-flex mb-3 align-items-baseline">
                                    <label className="form-label col-2 rgb-2 ffw-2 " htmlFor="username">Solid url</label>
                                    <input type="text" className="FFormInput w-100" name="solidUrl"
                                           value={this.state.oidcIssuer} onChange={this.onChangeURL}/>
                                </div>
                            </div>
                            
                            <div className="btn rgb-bg-solid rgb-1 btn-block">
                              <LoginButton disabled={this.state.loading}
                                           authOptions={{clientName: "Filmer"}}
                                           oidcIssuer={this.state.oidcIssuer}
                                           redirectUrl={window.location.protocol + '//' + window.location.host + '/home'}
                                           onError={console.error}>
                                  {this.state.loading && (<span className="spinner-border spinner-border-sm"/>)}
                                  <div className="d-flex align-items-center justify-content-center">
                                      <img className="me-1" src="https://genr.eu/wp/wp-content/uploads/2018/10/logo.svg"
                                           width="18px" alt=""/>
                                      Continue
                                  </div>
                              </LoginButton>
                            </div>
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
