import React, {Component} from "react";
import axios from "axios";
import { Routes, Route, Link } from "react-router-dom";

import FFooter from "../components/FFooter.js";
import FHeader from "../components/FHeader";
import RsrcIconArrowLeft from "../resources/icon_arrow_left.svg";
import FMovieLine from "../components/FMovieLine";

class MyMoviesPage extends Component
{

    constructor(probs) {
        super(probs);
        this.searchTerm=""
    }
  componentDidMount()
  {

    document.title = "Filmer: Where people find their favourite movies!";
  }

  render ()
  {
      const movie1 = "Interstellar by Christopher Nolan"
      const score1 = "8.8"
      const tags1 = ["Sci-fi","Adventure","Drama"]
      const movie2 = "Inception by Christopher Nolan"
      const score2= "8.7"
      const tags2 = ["Sci-fi","Adventure","Action"]
    return (
<div className="h-100 d-flex flex-column">
      <FHeader/>
      <main className="mt-5 mb-5 container-fluid">
        <div className="d-lg-flex justify-content-around align-items-center">
            <div className="col-lg-8 mx-sm-5" >
                <div className="d-flex me-4 my-3 align-items-center">
                   <img src={RsrcIconArrowLeft} width="24px" className="me-3" alt=""/>
                    <p className="m-0 p-0 ffw-2 rgb-2">Back</p>
                </div>
                <div class="d-flex align-items-baseline">
                    <p class="ffs-1 ffw-2 m-0 p-0 me-4"> My movies</p>
                    <p className="ffs-2 ffw-2 m-0 p-0 rgb-2" > 2 movies</p>
                </div>
                <div class="d-sm-flex mt-4 justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <div className="dropdown h-50 w-100">
                            <button type="button" className="FFormInput ffw-2 rgb-2 btn-sm dropdown-toggle" data-bs-toggle="dropdown">Sort</button>
                            <ul className="dropdown-menu fborder rgb-bg-1 w-100">
                                <li><a className="dropdown-item text-white active" href="#">Title</a></li>
                                <li><a className="dropdown-item text-white" href="#">Seen</a></li>
                                <li><a className="dropdown-item text-white" href="#">Director</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="d-flex align-items-center">
                        <input type="email" className="FFormInput h-50 w-100 my-2" id="search" placeholder="search"/>
                        <img src={RsrcIconArrowLeft} width="38px" className="ms-1 fborder p-2" alt=""/>
                    </div>
                    <button class="btn btn-primary m-0 p-1 ffw-2 d-none d-sm-block">Add movie</button>
                    <button class="btn btn-primary m-0 p-1 ffw-2 d-sm-none w-100 my-3">Add movie</button>
                </div>
                <FMovieLine score={score1} name={movie1} tags={tags1}/>
                <FMovieLine score={score2} name={movie2} tags={tags2}/>
            </div>
        </div>
    </main>
    <FFooter/>
</div>
    );
  }

}

export default MyMoviesPage;

