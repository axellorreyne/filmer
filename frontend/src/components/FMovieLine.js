import React, {Component} from 'react';
import FTagList from "./FTagList";

import RsrcIconSeen from "../resources/icon_seen.svg"
import RsrcIconNotSeen from "../resources/icon_notseen.svg"
import RsrcIconStar from "../resources/icon_star.svg"
import RsrcPukeIcon from "../resources/icon_vomit.svg"

class FMovieLine extends Component
{
    render ()
    {
        const setSeen = this.props.onSeen
        const setDislike = this.props.onDislike
        const name = this.props.movie.original_title
        const tags = this.props.movie.genres.map(genre=>genre.name)
        const score = this.props.movie.vote_average.toFixed(1)
        const director = this.props.movie.credits.crew.filter(x=>x.job==="Director").slice(0,3)
            .map(x=>x.name).sort().join(", ")
        const inner =
            (this.props.seen)?
            <img src={RsrcIconSeen} width="18px" className="me-2" alt=""/>
            :<img src={RsrcIconNotSeen} width="18px" className="me-2" alt=""/>

        const check =
            <button onClick={()=>setSeen()} className="bg-transparent border-0">
                {inner}
            </button>

        return (
          <div>
            <hr className="my-md-2"/>
            <div className="ffs-2 ffw-2 me-3">{name}</div>
            <div className="rgb-2">{director}</div>
            <div className="d-flex justify-content-between align-items-end">
              <FTagList tags={tags}/>
              <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center me-3">
                  <img src={RsrcIconStar} width="18px" className="me-2" alt=""/>
                  {score}
                </div>
                {check}
                <button className="bg-transparent border-0 " onClick={()=>setDislike()}>
                    <img src={RsrcPukeIcon} width="18px" className="me-2" alt=""/>
                </button>
              </div>
            </div>
          </div>
        );
    }
}

export default FMovieLine;
