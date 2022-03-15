import {Component} from 'react';
import {Link} from "react-router-dom";
import RsrcLogo from "../resources/logo_transparant.svg";

class FHeader extends Component 
{
  render () 
  {
    return (
<nav className="rgb-2 ffs-4 navbar navbar-expand-lg navbar-dark container mb-5">
    <div className="container-fluid">
        <Link to="/home"><img src={RsrcLogo} width="100px" className="navbar-brand" alt=""/></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbar">
            <ul className="text-center navbar-nav m-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link to="/home"><a className="nav-link" href="/home">Home</a></Link>
                </li>
                <li className="nav-item">
                    <Link to="/mymovies"><a className="nav-link" href="/mymovies">My Movies</a></Link>
                </li>
            </ul>
            <ul className="text-center navbar-nav">
                <Link to="/settings"><li className="nav-item"><a className="nav-link" href="/settings">Settings</a></li></Link>
            </ul>
        </div>
    </div>
</nav>
    );
  }
}

export default FHeader;
