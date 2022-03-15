import { Component } from "react";

import MovieService from "../services/movie.service";

import FHeader from "../components/FHeader.js";
import FFooter from "../components/FFooter.js";
import FTagList from "../components/FTagList.js";

import RsrcIconArrowLeft from "../resources/icon_arrow_left.svg";
import RsrcIconArrowRight from "../resources/icon_arrow_right.svg";
import RsrcIconHeart from "../resources/icon_heart.svg";
import RsrcIconVomit from "../resources/icon_vomit.svg";

class HomePage extends Component
{

  constructor(props)
  {
      super(props)
      this.state = {movie: {adult: false, backdrop_path: "/hQ4pYsIbP22TMXOUdSfC2mjWrO0.jpg", belongs_to_collection: null, budget: 0, genres: [ { id: 18, name: "Drama" }, { id: 80, name: "Crime" }, { id: 35, name: "Comedy" } ], homepage: "", id: 2, imdb_id: "tt0094675", original_language: "fi", original_title: "Ariel", overview: "Taisto Kasurinen is a Finnish coal miner whose father has just committed suicide and who is framed for a crime he did not commit. In jail, he starts to dream about leaving the country and starting a new life. He escapes from prison but things don't go as planned...", popularity: 13.052, poster_path: "/ojDg0PGvs6R9xYFodRct2kdI6wC.jpg", production_companies: [ { id: 2303, logo_path: null, name: "Villealfa Filmproductions", origin_country: "FI" } ], production_countries: [ { iso_3166_1: "FI", name: "Finland" } ], release_date: "1988-10-21", revenue: 0, runtime: 73, spoken_languages: [ { english_name: "German", iso_639_1: "de", name: "Deutsch" }, { english_name: "Finnish", iso_639_1: "fi", name: "suomi" } ], status: "Released", tagline: "", title: "Ariel", video: false, vote_average: 6.8, vote_count: 157 } }
  }

  componentDidMount()
  {
    document.title = "Filmer: Home";
    MovieService.getRandomMovieInfo().then(data => {this.setState({movie: data})});
  }

  render()
  {
    const title     = "";
    const overview  = "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.";
    const tags      = ["Sci-Fi", "Adventure", "Drama"];
    const video     = "https://www.youtube.com/embed/zSWdZVtXT7E";
    const likes     = 10293;
    const dislikes  = 2301;
    const directors = ["Chistopher Nolan"];
    const writers   = ["Christopher Nolan", "Jonathan Nolan"];
    const starring  = ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"];
   
    const directors_rendered = directors.map((element) => <p className="m-0 p-0">{element}</p>);
    const writers_rendered   = writers.map((element) => <p className="m-0 p-0">{element}</p>);
    const starring_rendered  = starring.map((element) => <p className="m-0 p-0">{element}</p>);

    return(
<div className="h-100 d-flex flex-column p-3">
    <FHeader/> 
    <main className="mt-auto mb-1 container-fluid">
        <div className="mb-5 d-flex justify-content-around align-items-center">
            <div className="col d-none d-xl-flex justify-content-center">
               <img src={RsrcIconArrowLeft} width="32px" className="me-3" alt=""/> 
               <img src={RsrcIconHeart} width="32px" alt=""/> 
            </div>
            <div className="col-xl-7">
                <div className="d-flex mb-5 justify-content-center">
                    <div className="d-xl-none d-flex me-4">
                       <img src={RsrcIconArrowLeft} width="28px" className="me-3" alt=""/> 
                       <img src={RsrcIconHeart} width="28px" alt=""/> 
                    </div>
                    <div className="d-xl-none d-flex">
                       <img src={RsrcIconVomit} width="28px" className="me-3" alt=""/> 
                       <img src={RsrcIconArrowRight} width="28px" alt=""/> 
                    </div>
                </div>
                <p className="mb-3 ffs-1 ffw-2 m-0 p-0">{this.state.movie.original_title}</p>
                <FTagList tags={tags}/>
                <p className="my-3">{this.state.movie.overview}</p>
                <div className="d-xl-flex">
                    <div className="col me-3">
                        <div className="ratio ratio-16x9">
                            <iframe src={video} title="title"/>
                        </div>
                        <div className="d-flex mt-3 mb-5">
                            <div className="d-flex me-4">
                                <img src={RsrcIconHeart} width="32px" className="me-2" alt=""/>
                                <label className="ffs-2">{likes}</label> 
                            </div>
                            <div className="d-flex me-4">
                                <img src={RsrcIconVomit} width="32px" className="me-2" alt=""/>
                                <label className="ffs-2">{dislikes}</label> 
                            </div>
                        </div>
                    </div>
                    <div className="d-sm-flex d-xl-block justify-content-around ffw-2">
                        <div className="">
                            <p className="m-0 p-0 mt-3 mb-1 rgb-2">Director</p>
                            {directors_rendered}
                        </div>
                        <div className="">
                            <p className="m-0 p-0 mt-3 mb-1 rgb-2">Writer</p>
                            {writers_rendered}
                        </div>
                        <div className="">
                            <p className="m-0 p-0 mt-3 mb-1 rgb-2">Starring</p>
                            {starring_rendered}
                        </div>
                    </div>
                </div>
            </div>
            <div className="col d-none d-xl-flex justify-content-center">
               <img src={RsrcIconVomit} width="32px" className="me-3" alt=""/> 
               <img src={RsrcIconArrowRight} width="32px" alt=""/> 
            </div>
        </div>
    </main>
    <FFooter/>
</div>
    ); 
  }


}

export default HomePage;
