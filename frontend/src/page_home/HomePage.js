import { Component } from "react";

import MovieService from "../services/movie.service";
import UserService from "../services/user.service";

import FHeader from "../components/FHeader.js";
import FFooter from "../components/FFooter.js";
import FTagList from "../components/FTagList.js";

import RsrcIconArrowLeft from "../resources/icon_arrow_left_active.svg";
import RsrcIconArrowRight from "../resources/icon_arrow_right_active.svg";
import RsrcIconHeart from "../resources/icon_heart.svg";
import RsrcIconVomit from "../resources/icon_vomit.svg";

class HomePage extends Component
{
  
  
  constructor(props)
  {
      super(props)
      this.seenCheck = false;
      this.state = {movie: {adult: false, backdrop_path: "", belongs_to_collection: null, budget: 0, genres: [], homepage: "", id: 0, imdb_id: "", original_language: "", original_title: "", overview: "", popularity: 0, poster_path: "", production_companies: [], production_countries: [], status: "", tagline: "", title: "", video: false, vote_average: 0, vote_count: 0}} 
  }

  loadMovie()
  {
    MovieService.getRandomMovieInfo().then(data => {this.setState({movie: data})});
  }

  rateMovie(liked)
  {
      UserService.createReaction(this.state.movie.id.toString(),liked,this.seenCheck)
      this.loadMovie()
  }

  likeMovie()
  {
      this.rateMovie(true)
  }

  dislikeMovie()
  {
      this.rateMovie(false)
  }

  componentDidMount()
  {
    document.title = "Filmer: Home";
    this.loadMovie()
  }

  render()
  {
    const video     = "https://www.youtube.com/embed/zSWdZVtXT7E";
    const likes     = 10293;
    const dislikes  = 2301;
    const directors = ["Chistopher Nolan"];
    const writers   = ["Christopher Nolan", "Jonathan Nolan"];
    const starring  = ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"];
    
    const icon_width = "19px";
    const icon_width_2 = "27px";
    
    return(
<div className="h-100 d-flex flex-column">
  <FHeader/> 
  <main className="mb-5 mx-0">
    <div className="mb-5 d-flex justify-content-around">
      <button className="col d-none d-xl-flex justify-content-center align-items-center rgb-bg-2 hover-bg-dark my-5 me-5 border-0" onClick={()=>this.dislikeMovie()}>
          <img src={RsrcIconArrowLeft} width={icon_width_2} className="me-3" alt=""/> 
          <img src={RsrcIconVomit} width={icon_width_2} alt=""/>
        </button>
      <div className="col-xl-7 mw-50">
        <div className="d-flex mb-5 justify-content-center">
          <div className="d-xl-none d-flex me-4">
            <button className="btn btn-dark shadow" onClick={()=>this.likeMovie()}>
              <img src={RsrcIconArrowLeft} width={icon_width_2} className="me-3" alt=""/>
              <img src={RsrcIconHeart} width={icon_width_2} alt=""/>
            </button>
          </div>
          <div className="d-xl-none d-flex">
            <button className="btn btn-dark shadow" onClick={()=>this.dislikeMovie()}>
              <img src={RsrcIconVomit} width={icon_width_2} className="me-3" alt=""/>
              <img src={RsrcIconArrowRight} width={icon_width_2} alt=""/>
            </button>
          </div>
        </div>
        <div className="d-flex mb-4">
          <div className="form-check">
            <label className="form-check-label" htmlFor="flexCheckDefault">Seen</label>
            <input className="form-check-input" type="checkbox" value="0" id="flexCheckDefault" onClick={()=>this.seenCheck=!this.seenCheck}/>
          </div>
        </div>
        <p className="mb-3 ffs-1 ffw-2 m-0 p-0">{this.state.movie.original_title}</p>
        <FTagList tags={this.state.movie.genres.map((element)=>element.name)}/>
        <p className="my-3">{this.state.movie.overview}</p>
        <div className="d-xl-flex">
          <div className="col me-3">
            <div className="ratio ratio-21x9">
              <iframe src={video} title="title" frameborder="0" allow="" allowfullscreen></iframe>>
            </div>
            <div className="d-flex mt-3 mb-5 justify-content-between">
              <div className="d-flex">
                <div className="d-flex me-4">
                  <img src={RsrcIconHeart} width={icon_width} className="me-2" alt=""/>
                  <label className="ffs-2">{likes}</label>
                </div>
                <div className="d-flex me-4">
                  <img src={RsrcIconVomit} width={icon_width} className="me-2" alt=""/>
                  <label className="ffs-2">{dislikes}</label>
                </div>
              </div>
            </div>
          </div>
          <div className="d-sm-flex d-xl-block justify-content-around ffw-2">
            <div>
              <p className="m-0 p-0 mt-3 mb-1 rgb-2">Director</p>
              {directors.map((element) => <p className="m-0 p-0">{element}</p>)}
            </div>
            <div>
              <p className="m-0 p-0 mt-3 mb-1 rgb-2">Writer</p>
              {writers.map((element) => <p className="m-0 p-0">{element}</p>)}
            </div>
            <div>
              <p className="m-0 p-0 mt-3 mb-1 rgb-2">Starring</p>
              {starring.map((element) => <p className="m-0 p-0">{element}</p>)}
            </div>
          </div>
        </div>
      </div>
      <button className="col d-none d-xl-flex justify-content-center align-items-center rgb-bg-2 hover-bg-dark my-5 ms-5 border-0" onClick={()=>this.likeMovie()}>
        <img src={RsrcIconHeart} width={icon_width_2} className="me-3" alt=""/>
        <img src={RsrcIconArrowRight} width={icon_width_2} alt=""/>
      </button>
    </div>
  </main>
  <FFooter/>
</div>
    ); 
  }


}

export default HomePage;
