import React, {Component} from 'react';
import FTagList from "./FTagList";

import MovieService from "../services/movie.service"
import RsrcIconSeen from "../resources/icon_seen.svg"
import RsrcIconNotSeen from "../resources/icon_notseen.svg"
import RsrcIconStar from "../resources/icon_star.svg"
import RsrcPukeIcon from "../resources/icon_vomit.svg"
import {withRouter} from "../tools/WithRouter";
import RsrcSearchIcon from "../resources/icon_search.svg";
import HomePage from "../page_home/HomePage";
import Dummy from "../resources/dummy_poster.svg";

class FMovieLine extends Component
{
    render ()
    {
        const linked = this.props.isLinked
        const info = this.props.renderInfo
        const setSeen = this.props.onSeen
        const setDislike = this.props.onReact
        const reactIcon = this.props.reactIcon
        const name = this.props.movie.original_title
        const score = this.props.movie.vote_average.toFixed(1)
        const link = (linked)?<button className="bg-transparent border-0" onClick={()=>{
                                        HomePage.preloaded=this.props.movie.id
                                        HomePage.hasReaction = this.props.hasReaction
                                        this.props.navigate("/home")
                                    }}>
                        <img src={RsrcSearchIcon} height="30px" width="30px" className="hover-bg-dark fborder p-2" alt=""/>
                  </button>:<></>
        const inner =
            (this.props.seen)?
            <img src={RsrcIconSeen} width="18px" className="me-2" alt=""/>
            :<img src={RsrcIconNotSeen} width="18px" className="me-2" alt=""/>

        const check = <button onClick={()=>setSeen()} className="bg-transparent border-0">
                {inner}
            </button>
        const vomit = <button className="bg-transparent border-0 " onClick={()=>setDislike()}>
                    <img src={reactIcon} width="18px" className="me-2" alt=""/>
                </button>
        let line ;
        if(info){
            const tags = this.props.movie.genres.map(genre=>genre.name)
            const director = this.props.movie.credits.crew.filter(x=>x.job==="Director").slice(0,3).map(x=>x.name).sort().join(", ")

            line=
                <div>
                    <div className="rgb-2">{director}</div>
                    <div className="d-flex justify-content-between align-items-end">
                        <FTagList tags={tags}/>
                    </div>
                </div>
        }else{
            line=<div>

                </div>
        }
        let source = "https://image.tmdb.org/t/p/original/"+this.props.movie.poster_path
        return (
          <div className="m-1 mb-5">
              <div className="card bg-dark h-100 w-100"  >
                  <img src={source} className="card-img-top" onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src=Dummy;
                  }} style={{width: 170}}/>
                  <div className="card-body" style={{width: 170}}>
                    <div className="ffs-2 ffw-2 me-3">{name}</div>
                      {line}
                  </div>
                  <div className="d-flex justify-content-evenly mb-2">
                      <div className="d-flex align-items-center me-3">
                          <img src={RsrcIconStar} width="18px" className="me-2" alt=""/>
                          {score}
                      </div>
                      {check}
                      {vomit}
                      {link}
                  </div>
              </div>
          </div>
        );
    }
}

export default withRouter(FMovieLine);
