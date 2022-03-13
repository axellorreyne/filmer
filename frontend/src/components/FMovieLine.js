import React, {Component} from 'react';

class FMovieLine extends Component
{

    render ()
    {
        return (
            <div className="fmovieline mt-2 mb-1 d-flex ">

                <div className="row w-100">
                    <hr/>
                    <div className="col-6">
                        {this.props.name}
                    </div>
                    <div className="col-2">
                        {this.props.score}/10
                    </div>
                    <div className="col-4">
                        {this.props.tags.join(", ")}
                    </div>
                </div>
            </div>
        );
    }
}

export default FMovieLine;
