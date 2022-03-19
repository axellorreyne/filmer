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
      this.state = { 
        movie: {
          adult: false, 
          backdrop_path: "", 
          belongs_to_collection: null, 
          budget: 0, 
          genres: [], 
          homepage: "", 
          id: 0, 
          imdb_id: "", 
          original_language: "", 
          original_title: "", 
          overview: "", 
          popularity: 0, 
          poster_path: "", 
          production_companies: [], 
          production_countries: [], 
          status: "", 
          tagline: "", 
          title: "", 
          video: false, 
          videos: {results: [{}]}, 
          vote_average: 0, 
          vote_count: 0, 
          credits: { 
            cast: [{ 
              adult: false, 
              gender: 0, id: 0,
              known_for_department: "", 
              name: "", 
              original_name: "", 
              popularity: 0, 
              profile_path: "", 
              cast_id: 0, 
              character: "", 
              credit_id: "", 
              order: 0
              }], 
            crew: [{
              adult: false, 
              gender: 0, 
              id: 0, 
              known_for_department: "", 
              name: "", 
              original_name: "", 
              populariy: "", 
              profile_path: null, 
              credit_id: "", 
              department: "", 
              job: ""
              }
            ]}}};
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
    const icon_width = "19px";
    const icon_width_2 = "33px";
   
    const movie = this.state.movie;
    const title = movie.original_title;
    const description = movie.overview;
    const genres = movie.genres.map((element)=>element.name);
    var video = movie.videos.results.filter((x) => x.type === "Trailer")[0];
    if (typeof video === 'undefined')
    {
      video = movie.videos.results[0];
    }
    const likes = -1;
    const dislikes = -1;
    const directors = movie.credits.crew.filter((x) => x.job === "Director").slice(0,5).map((x) => x.name);
    const writers = movie.credits.crew.filter((x) => (x.department === "Writing") && (x.job = "Screenplay")).slice(0,5).map((x) => x.name);
    const starring = movie.credits.cast.filter((x) => x.popularity > 15).slice(0, 5).map((x) => x.name).sort((x,y) => x.popularity - y.popularity);

    return(
<div className="h-100 d-flex flex-column m-4 m-xxl-0">
  <FHeader/> 
  <main className="mt-auto mb-5 mx-0">
    <div className="mb-5 d-flex justify-content-around">
      <button className="col d-none d-xxl-flex justify-content-center align-items-center rgb-bg-2 hover-bg-dark my-5 me-5 border-0" onClick={()=>this.dislikeMovie()}>
          <img src={RsrcIconArrowLeft} width={icon_width_2} className="me-3" alt=""/> 
          <img src={RsrcIconVomit} width={icon_width_2} alt=""/>
        </button>
      <div className="col-xxl-7 mw-50">
        <div className="d-flex mb-5 justify-content-center">
          <div className="d-xxl-none d-flex me-4">
            <button className="btn hover-bg-dark shadow" onClick={()=>this.likeMovie()}>
              <img src={RsrcIconArrowLeft} width={icon_width_2} className="me-3" alt=""/>
              <img src={RsrcIconHeart} width={icon_width_2} alt=""/>
            </button>
          </div>
          <div className="d-xxl-none d-flex">
            <button className="btn hover-bg-dark shadow" onClick={()=>this.dislikeMovie()}>
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
        <p className="mb-3 ffs-1 ffw-2 m-0 p-0">{title}</p>
        <FTagList tags={genres}/>
        <p className="my-3">{description}</p>
        <div className="d-xxl-flex">
          <div className="col-xxl-9 me-3">
            <div className="ratio ratio-21x9">
              {<iframe height={video.size} src={"https://www.youtube.com/embed/" + video.key} title={video.name} frameBorder="0" allowFullscreen="true"></iframe>}
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
          <div className="col d-sm-flex d-xxl-block justify-content-around ffw-2">
            <div>
              <p className="m-0 p-0 mb-1 rgb-2">Director</p>
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
      <button className="col d-none d-xxl-flex justify-content-center align-items-center rgb-bg-2 hover-bg-dark my-5 ms-5 border-0" onClick={()=>this.likeMovie()}>
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
