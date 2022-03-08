import { Component } from "react";
import axios from "axios";

import "./HomePage.css";
import FHeader from "../components/FHeader.js";
import RsrcLogo from "../resources/logo_transparant.svg";

class HomePage extends Component
{
  
  componentDidMount()
  {
    document.title = "Filmer: Home";
  }

  render()
  {
    return(
<div class="">

  <FHeader/> 
     
  <main>
  </main>
 
  <footer>
    <div class="text-center">
      <p><a href="">Terms of Service</a> - <a href="">Privacy Policy</a> - <a href="">Cookie Policy</a> - <a href="">About</a> - <a href="">Developers</a></p>
      <p>(c) 2022 filmer inc.</p>
    </div>
  </footer>

</div>
    ); 
  }


}

export default HomePage;
