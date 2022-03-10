import { Component } from "react";
import axios from "axios";

import FHeader from "../components/FHeader.js";
import FFooter from "../components/FFooter.js";
import FTagList from "../components/FTagList.js";
import FCrewList from "../components/FCrewList.js";
import FIconWText from "../components/FIconWText.js";

import RsrcLogo from "../resources/logo_transparant.svg";
import RsrcIconArrowLeft from "../resources/icon_arrow_left.svg";
import RsrcIconArrowRight from "../resources/icon_arrow_right.svg";
import RsrcIconArrowLeftActive from "../resources/icon_arrow_left_active.svg";
import RsrcIconArrowRightActive from "../resources/icon_arrow_right_active.svg";
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
    const title     = "Interstellar";
    const overview  = "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.";
    const tags      = ["Sci-Fi", "Adventure", "Drama"];
    const video     = "https://www.youtube.com/embed/zSWdZVtXT7E";
    const likes     = 10293;
    const dislikes  = 2301;
    const directors = ["Chistopher Nolan"];
    const writers   = ["Christopher Nolan", "Jonathan Nolan"];
    const starring  = ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"];
    
    return(
<div className="h-100 d-flex flex-column">
    <FHeader/> 
    <main className="mt-5 mb-5 container-fluid">
        <div className="d-flex justify-content-around align-items-center">
            <div className="col d-none d-xl-flex justify-content-center">
               <img src={RsrcIconArrowLeft} width="32px" className="me-3" alt=""/> 
               <img src={RsrcIconHeart} width="32px" alt=""/> 
            </div>
            <div className="col-lg-auto">
                <div className="d-flex mb-3 justify-content-center">
                    <div className="d-xl-none d-flex me-4">
                       <img src={RsrcIconArrowLeft} width="28px" className="me-3" alt=""/> 
                       <img src={RsrcIconHeart} width="28px" alt=""/> 
                    </div>
                    <div className="d-xl-none d-flex">
                       <img src={RsrcIconVomit} width="28px" className="me-3" alt=""/> 
                       <img src={RsrcIconArrowRight} width="28px" alt=""/> 
                    </div>
                </div>
                <h1>{title}</h1>
                <FTagList tags={tags}/>
                <p className="my-3">{overview}</p>
                <div className="d-lg-flex">
                    <div className="col me-3">
                        <div className="ratio ratio-16x9">
                            <iframe src={video}/>
                        </div>
                        <div className="d-flex mt-3 mb-5">
                           <FIconWText icon={RsrcIconHeart} text={likes}/> 
                           <FIconWText icon={RsrcIconVomit} text={dislikes}/> 
                        </div>
                    </div>
                    <FCrewList directors={directors} writers={writers} starring={starring}/>
                </div>
            </div>
            <div className="col d-none d-xl-flex justify-content-center">
               <img src={RsrcIconVomit} width="32px" className="me-3"/> 
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
