import {Component} from "react";
import axios from "axios";
import "./LandingPage.css";
import FFooter from "../components/FFooter.js";
import FHeaderAlt from "../components/FHeaderAlt.js";
import RsrcLogo from "../resources/logo_transparant.svg";

class LandingPage extends Component 
{

  componentDidMount() 
  {
    document.title = "Filmer: Where people find their favourite movies!";
  }

  render ()
  {
    return (
<div className="container h-100 text-center d-flex flex-column">
    <FHeaderAlt/>
    <main className="mb-5">
        <h1>Where people find their favourite movies!</h1>
        <div className="mt-5">
            <button type="button" className="btn btn-light m-1">Sign up</button>
            <button type="button" className="btn btn-light m-1">Log in</button>
        </div>
    </main>
    <FFooter/>
    <maintitle text="settings"/>
</div>
    );
  }

}

export default LandingPage;

