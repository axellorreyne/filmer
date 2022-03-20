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
        expandDescription: false,
        disableButtons: "disabled",
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
    this.setState({disableButtons: "disabled"})
    MovieService.getRandomMovieInfo().then(data => {this.setState({expandDescription: false, disableButtons: "", movie: data})});
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
    const icon_width   = "19px";
    const icon_width_2 = "33px";
   
    const movie = this.state.movie;
    const title = movie.original_title;
    const genres = movie.genres.map((element)=>element.name);
    
    const description = movie.overview;
    const description_elips_length = 400;
    var description_rendered = <p>{description.slice(0, description_elips_length) + "... "}
      <button className="m-0 p-0 border-0 rgb-2 rgb-bg-tr ffw-2 hover-bg-dark" onClick={()=>this.setState({expandDescription: true})}>(read more)</button></p>
    if (this.state.expandDescription || description.length < description_elips_length + 40)
    {
     description_rendered = <p>{description}</p>
    }
   
    var videos = movie.videos.results
    videos = videos.filter((x)=>x.official===true).concat((x)=>x.official=false)
    var video = videos.filter((x) => x.type === "Trailer")[0];
    if (typeof video === 'undefined')
    {
      video = movie.videos.results[0];
    }
    var video_rendered = <div class="rgb-2 d-flex justify-content-center align-items-center mb-5">video not available</div>;
    if (typeof video !== 'undefined')
    {
      video_rendered = <iframe height={video.size} src={"https://www.youtube.com/embed/" + video.key} title={video.name} frameBorder="0" allowFullscreen="true"></iframe>
    }
    
    const directors = [...new Set(movie.credits.crew.filter((x) => x.job === "Director").slice(0,5).map((x) => x.name))];
    const writers = [...new Set(movie.credits.crew.filter((x) => (x.department === "Writing") && (x.job = "Screenplay")).slice(0,5).map((x) => x.name))];
    const starring = [...new Set(movie.credits.cast.filter((x) => x.popularity > 15).slice(0, 5).map((x) => x.name).sort((x,y) => x.popularity - y.popularity))];
    
    const likes = 0;
    const dislikes = 0;

    console.log(this.state.disableButtons);
    this.state.disableButtons = "disabled";

    return(
<div className="h-100 d-flex flex-column m-4 m-xxl-0">
  <FHeader/> 
  <main className="mx-0">
    <div className="mb-5 d-flex justify-content-around">
      <button className={"btn col rounded d-none d-xxl-flex justify-content-center align-items-center rgb-bg-2 hover-bg-dark mt-5 me-5 border-0 disabled"} onClick={()=>this.dislikeMovie()}>
          <img src={RsrcIconArrowLeft} width={icon_width_2} className="me-3" alt=""/> 
          <img src={RsrcIconVomit} width={icon_width_2} alt=""/>
        </button>
      <div className="col-xxl-7 ms-4 mt-5">
        <div className="d-flex mb-5 mb-xxl-0 justify-content-center">
          <div className="d-xxl-none d-flex me-4">
            <button className="btn hover-bg-dark shadow" onClick={()=>this.dislikeMovie()}>
              <img src={RsrcIconArrowLeft} width={icon_width_2} className="me-3" alt=""/>
              <img src={RsrcIconVomit} width={icon_width_2} className="me-3" alt=""/>
            </button>
          </div>
          <div className="d-xxl-none d-flex">
            <button className="btn hover-bg-dark shadow" onClick={()=>this.likeMovie()}>
              <img src={RsrcIconHeart} width={icon_width_2} alt=""/>
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
        <label className="ffs-1 ffw-2 m-0 p-0">{title}</label>
        <FTagList tags={genres}/>
        <div className="d-xl-flex mt-4">
          <div className="col-xl-9 me-3">
            <div className="ratio ratio-21x9">
              {video_rendered}
            </div>
            <div className="d-flex mt-3 mb-2  justify-content-between">
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
            <div className="mb-3 mt-auto">
              {description_rendered}
            </div>
          </div>
          <div className="col d-sm-flex d-xl-block justify-content-left ffw-2 ms-1">
            <div className="me-5 mb-3">
              <p className="m-0 p-0 mb-1 rgb-2">Director</p>
              {directors.map((element) => <p className="m-0 p-0">{element}</p>)}
            </div>
            <div className="me-5 mb-3">
              <p className="m-0 p-0 mb-1 rgb-2">Writer</p>
              {writers.map((element) => <p className="m-0 p-0">{element}</p>)}
            </div>
            <div>
              <p className="m-0 p-0 mb-1 rgb-2">Starring</p>
              {starring.map((element) => <p className="m-0 p-0">{element}</p>)}
            </div>
          </div>
        </div>
      </div>
      <button className="col rounded d-none d-xxl-flex justify-content-center align-items-center rgb-bg-2 hover-bg-dark mt-5 ms-5 border-0" onClick={()=>this.likeMovie()}>
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
