import {Component} from "react";
import axios from "axios";

import "./LandingPage.css";

import RsrcLogo from "../resources/logo_transparant.svg";

class LandingPage extends Component 
{

  componentDidMount() {
    document.title = "Filmer: Where people find their favourite movies!";
  }

  render ()
  {
    return (
<div class="cover-container d-flex h-100 p-3 mx-auto flex-column text-center">
  <header class="masthead mb-auto">
    <img src={RsrcLogo} width="100px"/>
  </header>
  <main role="main" class="mb-5">
    <h1 class="cover-heading">Where people find their favourite movies!</h1>
    <div class="mt-5">
      <button type="button" class="btn btn-light m-1">Sign up</button>
      <button type="button" class="btn btn-light m-1">Log in</button>
    </div>
  </main>
  <footer class="mastfoot mt-auto">
    <div class="inner">
      <p><a href="">Terms of Service</a> - <a href="">Privacy Policy</a> - <a href="">Cookie Policy</a> - <a href="">About</a> - <a href="">Developers</a></p>
      <p>(c) 2022 filmer inc.</p>
    </div>
  </footer>
</div>
    );
  }

}

export default LandingPage;

