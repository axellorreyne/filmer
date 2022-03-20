import React, {Component} from 'react';
import FTagList from "./FTagList";

import RsrcIconStar from "../resources/icon_star.svg"
import RsrcIconCheck from "../resources/icon_check.svg"

class FMovieLine extends Component
{

    render ()
    {
        const name = this.props.movie.original_title
        const tags = this.props.movie.genres.map(genre=>genre.name)
        const score = this.props.movie.vote_average
        const director = "by "+this.props.movie.credits.crew.filter(x=>x.job==="Director").slice(0,3)
            .map(x=>x.name).sort().join(", ")
        const check = (this.props.seen)?
            <img src={RsrcIconCheck} width="24px" className="me-2" alt=""/>
            :<div />

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
                    <div className="me-auto ffs-2 ffw-2 mb-md-2">
                            <FTagList tags={tags}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default FMovieLine;
