import React, {Component} from "react";

import FFooter from "../components/FFooter.js";
import FHeader from "../components/FHeader";
import FMovieLine from "../components/FMovieLine";

import RsrcSearchIcon from "../resources/icon_search.svg";

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
      const amount = 2

    return (
<div className="h-100 d-flex flex-column p-3">
      <FHeader/>
      <main className="mb-5 container-fluid">
        <div className="my-5 d-lg-flex justify-content-around align-items-center">
            <div className="col-lg-7 mx-sm-5 mb-5" >
                <p className="ffs-1 ffw-2 m-0 p-0 me-4">My movies ({amount})</p>
                <div className="d-sm-flex mt-4 justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <div className="dropdown h-50 w-100">
                            <button type="button" className="FFormInput ffw-2 rgb-2 btn-sm dropdown-toggle" data-bs-toggle="dropdown">Sort</button>
                            <ul className="dropdown-menu fborder rgb-bg-1 w-100">
                                <li><a className="dropdown-item text-white active" href="/api/">Title</a></li>
                                <li><a className="dropdown-item text-white" href="/api/">Seen</a></li>
                                <li><a className="dropdown-item text-white" href="/api/">Director</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="d-flex align-items-center">
                        <input type="email" className="FFormInput h-50 w-100 my-2" id="search" placeholder="search"/>
                        <img src={RsrcSearchIcon} height="35px" width="38px" className="ms-1 fborder p-2" alt=""/>
                    </div>
                    <button className="btn btn-primary m-0 p-1 ffw-2 d-none d-sm-block">Add movie</button>
                    <button className="btn btn-primary m-0 p-1 ffw-2 d-sm-none w-100 my-3">Add movie</button>
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

