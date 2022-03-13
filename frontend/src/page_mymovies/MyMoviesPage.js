import React, {Component} from "react";
import axios from "axios";
import { Routes, Route, Link } from "react-router-dom";

import FFooter from "../components/FFooter.js";
import FHeaderAlt from "../components/FHeaderAlt.js";
import RsrcLogo from "../resources/logo_transparant.svg";
import FHeader from "../components/FHeader";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import RsrcIconArrowLeft from "../resources/icon_arrow_left.svg";
import FMovieLine from "../components/FMovieLine";
import RsrcIconHeart from "../resources/icon_heart.svg";

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
          <main className="mt-5 mb-auto container-fluid">
            <div className="d-lg-flex justify-content-around align-items-center">
                <div className="col-lg-7" >
                    <div className=" d-flex me-4">
                       <img src={RsrcIconArrowLeft} width="28px" className="me-3" alt=""/>
                        <p className="h5 text-muted">Back</p>
                    </div>
                    <div class="d-flex">
                        <p class = "h1"> My movies</p>
                        <div className="align-self-end">
                            <p className="h6 text-muted ps-5" > 2 movies</p>
                        </div>
                    </div>
                    <div class="row mt-5 w-100">
                        <div class="col-sm-6">
                            <div className="d-flex">
                                <p class="h6">Filter: </p>
                                <div className="dropdown w-50">
                                    <button type="button" className="btn btn-secondary btn-sm dropdown-toggle"
                                            data-bs-toggle="dropdown">
                                        Title,Seen,Director
                                    </button>
                                    <ul className="dropdown-menu bg-secondary">
                                        <li><a className="dropdown-item text-white" href="#">Title</a></li>
                                        <li><a className="dropdown-item text-white" href="#">Seen</a></li>
                                        <li><a className="dropdown-item text-white" href="#">Director</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="d-flex h-100 justify-content-between">
                                <div className="d-flex h-75 w-50">
                                    <input type="email" className="form-control bg-dark  text-light" id="search"
                                           placeholder="search"/>

                                    <div className=" border  ">
                                        <p className="my-0 text-muted">s</p>
                                    </div>
                                </div>
                                <p className="h6">add movie</p>
                            </div>
                        </div>
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

