import React, {Component} from "react";

import FFooter from "../components/FFooter.js";
import FHeader from "../components/FHeader";
import FMovieLine from "../components/FMovieLine";

import MovieService from "../services/movie.service";
import UserService from "../services/user.service";

import RsrcSearchIcon from "../resources/icon_search.svg";

class MyMoviesPage extends Component
{

  constructor(probs) {
    super(probs);
    this.state = {movies:[]}
  }
  componentDidMount()
  {
    UserService.getReactions().then((data)=>data.filter(movie=>! movie.seen && movie.like).forEach(
        movie=>MovieService.getMovieInfo(movie.movie_id).then(
            info=> {
              if (info.error === undefined) {
                this.setState((prev, _) => ({movies: prev.movies.concat([info])}))
              }
            }
        )
    ))
    document.title = "Filmer: Where people find their favourite movies!";
  }

  render ()
  {
    const amount = this.state.movies.length

    const rendered = (amount === 0)?
        <div className="container-fluid mt-5">
          <h5 >No movies to show.</h5>
          <h5>Like movies on the homepage to view them here!</h5>
        </div>
    : this.state.movies.map(ele=><FMovieLine movie={ele}/>)

    return (
      <div className="h-100 d-flex flex-column m-3 m-xxl-0">
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
                  <input type="email" className="FFormInput h-50 w-100 my-2" id="search" placeholder="search"/> <img src={RsrcSearchIcon} height="35px" width="38px" className="ms-1 fborder p-2" alt=""/>
                </div>
                <button className="btn btn-primary m-0 p-1 ffw-2 d-none d-sm-block">Add movie</button>
                <button className="btn btn-primary m-0 p-1 ffw-2 d-sm-none w-100 my-3">Add movie</button>
              </div>
              {rendered}
            </div>
          </div>
        </main>
        <FFooter/>
      </div>
    );
  }

}

export default MyMoviesPage;

