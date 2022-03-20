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
    this.state = {movies:[],filter:(i,o)=>true}
  }

    setFilter(filter){
      this.setState((prev,_)=>({movies:prev.movies,filter}))
    }

    setFilterSeen(){
     this.setFilter((i,o)=>(i.seen===o.seen)?0:(i.seen)?1:-1)
    }

    setFilterName(){
     this.setFilter((i,o)=>(i.movie.original_title===o.movie.original_title)?0:
                            (i.movie.original_title>o.movie.original_title)?1:-1)
    }

    setFilterDirectors(){
      this.setFilter((i,o)=>{
          const id = i.movie.credits.crew.filter(x=>x.job==="Director").slice(0,3)
            .map(x=>x.name).sort()
          const od = o.movie.credits.crew.filter(x=>x.job==="Director").slice(0,3)
            .map(x=>x.name).sort()
          for(let ind =0;ind<3;ind++){
              if(id.length<=ind && od.length<=ind)
                  return 0
              if(id.length<=ind)
                  return -1
              if(od.length<=ind)
                  return 1
              if(id[ind]<od[ind])
                  return -1
              if(id[ind]>od[ind])
                  return 1
          }
          return 0
      })
    }


  componentDidMount()
  {
    UserService.getReactions().then((data)=>data.filter(movie=>movie.like).forEach(
        movie=>MovieService.getMovieInfo(movie.movie_id).then(
            info=> {
              if (info.error === undefined) {
                this.setState((prev, _) => ({movies: prev.movies.concat([{movie:info,seen:movie.seen}]),filter:prev.filter}))
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
    : this.state.movies.sort(this.state.filter).map(ele=><FMovieLine movie={ele.movie} seen={ele.seen}/>)

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
                      <li><a className="dropdown-item hover-bg-dark btn rounded-0" onClick={()=>this.setFilterName()}>Title</a></li>
                      <li><a className="dropdown-item hover-bg-dark btn rounded-0" onClick={()=>this.setFilterSeen()}>Seen</a></li>
                      <li><a className="dropdown-item hover-bg-dark btn rounded-0" onClick={()=>this.setFilterDirectors()}>Directors</a></li>
                    </ul>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <input type="email" className="FFormInput h-50 w-100 my-2" id="search" placeholder="search"/> <img src={RsrcSearchIcon} height="35px" width="38px" className="ms-1 fborder p-2" alt=""/>
                </div>
                <button className="btn btn-primary m-0 p-1 ffw-2 d-none d-sm-block disabled">Add movie</button>
                <button className="btn btn-primary m-0 p-1 ffw-2 d-sm-none w-100 my-3 disabled">Add movie</button>
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

