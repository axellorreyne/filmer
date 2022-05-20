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
    <main className="mb-5 mt-5 text-center">
      <h1>Where people find their favourite movies!</h1>
      <div className="mt-5 ffs-3 rgb-2">
        <div className="mb-3">
          <Link to="/signup"><button type="button" className="btn btn-primary m-1 col-10 col-md-2">Sign up</button></Link>
          <Link to="/login"><button type="button" className="btn btn-light m-1 col-10 col-md-2">Log in</button></Link>
        </div>
        <Link to="/solidlogin"><button type="button" className="btn btn-dark hover-bg-solid rgb-bg-solid rgb-1 m-1 col-10 col-md-2">
          <div className="d-flex align-items-center justify-content-center">
            <img className="me-1" src="https://genr.eu/wp/wp-content/uploads/2018/10/logo.svg" width="18px"/>
            solid
          </div>
        </button></Link>
      </div>
    </main>
    <FFooter/>
</div>
    );
  }

}

export default LandingPage;

