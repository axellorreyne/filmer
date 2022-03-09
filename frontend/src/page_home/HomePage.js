import { Component } from "react";
import axios from "axios";

import "./HomePage.css";
import FHeader from "../components/FHeader.js";
import FFooter from "../components/FFooter.js";
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
<div className="container h-100 d-flex flex-column">
    <FHeader/> 
    <main class="container">
        <div class="row">
            <div class="col-2">
                
            </div>
            <div class="col">
               <h1>Interstellar</h1>
            </div>
            <div class="col-2">
                
            </div>
        </div>
    </main>
    <FFooter/>
</div>
    ); 
  }


}

export default HomePage;
