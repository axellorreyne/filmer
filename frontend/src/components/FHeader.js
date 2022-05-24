import {Component} from 'react';
import {Link} from "react-router-dom";
import RsrcLogo from "../resources/logo_transparant.svg";
import AuthService from "../services/auth.service";
import {LogoutButton, SessionContext} from "@inrupt/solid-ui-react";
import SolidUserService from "../services/solid.user.service";

class FHeader extends Component 
{

  static contextType = SessionContext;

  constructor(props)
  {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout()
  {
    AuthService.logout();
  }
  
  render () 
  {
    return (
      <nav className="rgb-2 ffs-4 navbar navbar-expand-lg navbar-dark container mb-5 mt-3">
        <div className="container-fluid">
          <Link to="/home"><img src={RsrcLogo} width="100px" className="navbar-brand" alt=""/></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbar">
            <ul className="text-center mt-3 navbar-nav m-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="/home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/mymovies">My Movies</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/searchmovies">Search Movies</a>
              </li>
              {!SolidUserService.isSolidUser(this.context.session) &&
                  <li className="text-center navbar-nav">
                    <a className="nav-link" href="/room">Group</a>
                  </li>
              }
            </ul>
            <ul className="text-center navbar-nav">
              <li className="nav-item"><a className="nav-link" href="/settings">Settings</a></li>
              {!SolidUserService.isSolidUser(this.context.session)?<button className="border-0 rgb-bg-tr" onClick={this.logout}><li className="nav-item"><a className="nav-link" href="/">Logout</a></li></button>
                  :<LogoutButton/>}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default FHeader;
