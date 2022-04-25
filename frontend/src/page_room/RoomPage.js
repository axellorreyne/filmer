import React, {Component} from "react";
import StringSimilarity from "string-similarity";

import FFooter from "../components/FFooter.js";
import FHeader from "../components/FHeader";
import FMovieLine from "../components/FMovieLine";
import FTagList from "../components/FTagList";
import MovieService from "../services/movie.service";
import UserService from "../services/user.service";

import RsrcIconStar from "../resources/icon_star.svg"
import RsrcSearchIcon from "../resources/icon_search.svg";

class FriendsPage extends Component
{

  constructor(probs) {
    super(probs);
    this.state = 
      {
        movies: [],
      }
  }
    
  componentDidMount()
  {
    UserService.getReactions().then(
      (data) => 
      {
        let movies = [];
        const likedMovies = data.filter(movie => movie.like);
        likedMovies.forEach((movie, index) => 
          MovieService.getMovieInfo(movie.movie_id).then(
            (info) => 
            {
              movies.push({movie: info});
              if (index === likedMovies.length - 1)
              {
                console.log(info)
                this.setState({movies: movies});
              }
            },
            (error) =>
            {
            }
          )
        )
      }
    );
    document.title = "Filmer: Friends";
  }
  
  render()
  {
    const names = ["Bob ", "Bob1", "Bob2", "Bobbobbob", "Bob", "Bobobobobob"];
    const names_rendered = names.map((name, index) => 
      <div className="col-12 col-sm-6 col-md-4 pe-3">
        <hr className="my-2"/>
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <div className="ffs-3 ffw-2 rgb-2">{name}</div>
          </div>
        </div>
      </div>
    );
    
    const movies = this.state.movies;
    const movies_rendered = movies.map((data) => {
      const title = data.movie.original_title;
      const director = data.movie.credits.crew.filter(x=>x.job==="Director")
        .slice(0,3).map(x => x.name).sort().join(", ");
      const score = data.movie.vote_average.toFixed(1)
      const tags = data.movie.genres.map(genre=>genre.name).slice(0,3);
      return(
        <div>
          <hr className="my-md-2"/>
          <div className="ffs-2 ffw-2 me-3">{title}</div>
          <div className="rgb-2">{director}</div>
          <div className="d-flex justify-content-between align-items-end mt-2">
            <FTagList tags={tags}/>
            <div className="d-flex justify-content-between">
              <div className="d-flex align-items-center me-3">
                <img src={RsrcIconStar} width="18px" className="me-2" alt=""/>
                {score}
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="h-100 d-flex flex-column m-3 m-xxl-0">
        <FHeader/>
        <main className="mb-5 container-fluid">
          <div className="mt-5 d-lg-flex justify-content-around align-items-center">
            <div className="col-lg-7 mx-md-5 mb-5" >
              <p className="ffs-1 ffw-2 m-0 p-0 me-4">Room #24654</p>
              <p className="ffs-2 ffw-2 m-0 p-0 me-4 mt-5">{names.length} People</p>
              <div className="d-flex justify-content-left flex-wrap">
                {names_rendered}
              </div>
            </div>
          </div>
          <div className="mb-5 d-lg-flex justify-content-around align-items-center">
            <div className="col-lg-7 mx-md-5 mb-5" >
              <p className="ffs-2 ffw-2 m-0 p-0 me-4">Found {movies.length} movies</p>
              {movies_rendered} 
            </div>
          </div>
        </main>
        <FFooter/>
      </div>
    );
  }

}

export default FriendsPage;

