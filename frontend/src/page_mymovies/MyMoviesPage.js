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
                    <div class="row ">
                        <div class="col-1">
                            <img src={RsrcIconArrowLeft} width="32px" className="me-3" alt=""/>
                        </div>
                        <div className="col">
                            <p className="text-muted">Back</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-4">
                        <p class = "h1"> My movies</p>
                        </div>
                        <div className="col-sm-4">
                                <p className="h1 text-muted"> 2 movies</p>
                        </div>
                    </div>
                    <div class="row mt-5 w-100">
                        <div class="col-sm-4">
                            <p class="h6">Filter: Title,Seen,Director</p>
                        </div>
                        <div className="col-lg-5 align-bottom ">
                            <div className="row h-100 ">
                                <div className="col-10 h-100  ">
                                    <input type="email" className="form-control bg-dark h-75 text-light" id="search"
                                           placeholder="search"/>
                                </div>

                                <div className="col-2 h-75 border  ">
                                    <p className="my-0 text-muted">s</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-2">
                            <p className="h6">add movie</p>
                        </div>
                    </div>
                    <FMovieLine score={score1} name={movie1} tags={tags1}/>
                    <FMovieLine score={score2} name={movie2} tags={tags2}/>
                    <hr/>
                </div>
            </div>
        </main>
        <FFooter/>
      </div>
    );
  }

}

export default MyMoviesPage;

