import {Component} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

import RsrcLogo from "../resources/logo_transparant.svg";

class FHeader extends Component 
{
  render () 
  {
    return (
<nav class="FHeader navbar navbar-expand-lg navbar-dark container">
    <div class="container-fluid">
        <img src={RsrcLogo} width="100px" class="navbar-brand" alt=""/>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbar">
            <ul class="navbar-nav m-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <Link to="/home"><a class="nav-link" href="#">Home</a></Link>
                </li>
                <li class="nav-item">
                    <Link to="/mymovies"><a class="nav-link" href="#">My Movies</a></Link>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Friends</a>
                </li>

            </ul>
            <ul class="navbar-nav">
                <Link to="/settings"><li class="nav-item"><a class="nav-link" href="#">Settings</a></li></Link>
            </ul>
        </div>
    </div>
</nav>
    );
  }
}

export default FHeader;
