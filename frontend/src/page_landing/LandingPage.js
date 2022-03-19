import {Component} from "react";
import { Link } from "react-router-dom";

import FFooter from "../components/FFooter.js";
import FHeaderAlt from "../components/FHeaderAlt.js";

class LandingPage extends Component 
{

  componentDidMount() 
  {
    document.title = "Filmer: Where people find their favourite movies!";
  }

  render ()
  {
    return (
<div className="container h-100 d-flex flex-column align-items-center">
    <FHeaderAlt/>
    <main className="mb-5 text-center">
        <h1>Where people find their favourite movies!</h1>
        <div className="mt-5">
            <Link to="/signup"><button type="button" className="btn btn-primary m-1">Sign up</button></Link>
            <Link to="/login"><button type="button" className="btn btn-light m-1">Log in</button></Link>
        </div>
    </main>
    <FFooter/>
    <maintitle text="settings"/>
</div>
    );
  }

}

export default LandingPage;

