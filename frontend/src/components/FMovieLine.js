import React, {Component} from 'react';
import FTagList from "./FTagList";

import RsrcIconStar from "../resources/icon_star.svg"
import RsrcIconCheck from "../resources/icon_check.svg"
import RsrcArrowRight from "../resources/icon_arrow_right.svg"

class FMovieLine extends Component
{

    setSeen(movie_id,seen){
        //to be implemented


    }

    render ()
    {
        const name = this.props.movie.original_title
        const tags = this.props.movie.genres.map(genre=>genre.name)
        const score = this.props.movie.vote_average.toFixed(1)
        const director = "by "+this.props.movie.credits.crew.filter(x=>x.job==="Director").slice(0,3)
            .map(x=>x.name).sort().join(", ")
        const inner =
            (this.props.seen)?
            <img src={RsrcIconCheck} width="24px" className="me-2" alt=""/>
            :<img src={RsrcArrowRight} width="24px" className="me-2" alt=""/>

        const check =
            <button onClick={()=>this.setSeen(this.props.movie.id,!this.props.seen)} className="bg-transparent border-0">
                {inner}
            </button>

        return (
            <div classNameName="fmovieline m-0 p-0">
                <hr className="m-0 my-md-2 my-3"/>
                <div classNameName="d-xxl-flex align-items-center justify-content-between">
                    <div className="me-auto ffs-2 ffw-2 mb-md-2">{name}</div>
                    <div className="row">
                        <div className="col-sm-10">
                            {director}
                        </div>
                        <div className="col-2">
                            <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center me-3">
                                <img src={RsrcIconStar} width="24px" className="me-2" alt=""/>
                                {score}/10
                            </div>
                            {check}
                            </div>
                        </div>
                    </div>
                    <div>
                      <FTagList tags={tags}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default FMovieLine;
