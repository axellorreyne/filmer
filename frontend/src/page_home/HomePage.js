import { Component } from "react";
import axios from "axios";

import "./HomePage.css";
import FHeader from "../components/FHeader.js";
import FFooter from "../components/FFooter.js";

import RsrcLogo from "../resources/logo_transparant.svg";
import RsrcIconArrowLeft from "../resources/icon_arrow_left.svg";
import RsrcIconArrowRight from "../resources/icon_arrow_right.svg";
import RsrcIconHeart from "../resources/icon_heart.svg";
import RsrcIconVomit from "../resources/icon_vomit.svg";
import RsrcIconCheck from "../resources/icon_check.svg";
import RsrcIconStar from "../resources/icon_star.svg";

class HomePage extends Component
{
  
  componentDidMount()
  {
    document.title = "Filmer: Home";
  }

  render()
  {
    return(
<div className="h-100 d-flex flex-column">
    <FHeader/> 
    <main class="mt-5 mb-5 container-fluid">
        <div class="d-flex justify-content-around align-items-center">
            <div class="col-2 me-5 d-flex justify-content-center">
               <img src={RsrcIconArrowLeft} width="32px" class="me-3"/> 
               <img src={RsrcIconHeart} width="32px"/> 
            </div>
            <div class="col mx-5">
                <h1>Interstellar</h1>
                <div class="ftags mt-2 mb-1 d-flex">
                    <div class="ftag me-1 bg-light rounded">Adventure</div> 
                    <div class="ftag bg-light rounded">Drama</div>
                </div>
                <p>A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.</p>
                <div class="row">
                    <div class="col">
                        <div class="ratio ratio-16x9">
                            <iframe src="https://www.youtube.com/embed/zSWdZVtXT7E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                        <div class="d-flex mt-2">
                            <div class="d-flex me-4">
                                <img src={RsrcIconHeart} width="32px" class="me-3"/>
                                <div>
                                   <div class="ffs-3 col-secundary">53 friends liked this movie</div>
                                   <div class="ffs-2">1002313</div> 
                                </div>
                            </div>
                            <div class="d-flex">
                                <img src={RsrcIconVomit} width="32px" class="me-3"/>
                                <div>
                                   <div class="ffs-3 col-secundary">1 friends disliked this movie</div>
                                   <div class="ffs-2">1002313</div> 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-3 ffw-2 ffs-2">
                        <div class="col-secundary">Director</div>
                        <div class="mb-3">Christopher Nolan</div>
                        <div class="col-secundary">Writer</div>
                        <div class="">Christopher Nolan</div>
                        <div class="mb-3">Jonathan Nolan</div>
                        <div class="col-secundary">Staring</div>
                        <div class="">Matthew McConaughey</div>
                        <div class="">Anne Hathaway</div>
                        <div class="mb-3">Jessica Chastain</div>
                    </div>
                </div>
            </div>
            <div class="col-2 d-flex justify-content-center">
               <img src={RsrcIconVomit} width="32px" class="me-3"/> 
               <img src={RsrcIconArrowRight} width="32px"/> 
            </div>
        </div>
    </main>
    <FFooter/>
</div>
    ); 
  }


}

export default HomePage;
