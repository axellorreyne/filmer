import React, {Component} from 'react';
import FTagList from "./FTagList";

class FMovieLine extends Component
{

    render ()
    {
        return (
            <div className="fmovieline mt-2 mb-1 d-flex ">

                <div className="row w-100">
                    <hr/>
                    <div className="col-md-5">
                        {this.props.name}
                    </div>
                    <div className="col-md-2">
                        {this.props.score}/10
                    </div>
                    <div className="col-xxl-5 h-50">
                        <FTagList tags={this.props.tags}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default FMovieLine;
