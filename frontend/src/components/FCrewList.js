import {Component} from 'react';

class FCrewList extends Component 
{

    render () 
    {
        const directors = this.props.directors.map((element) => <div>{element}</div>);
        const writers = this.props.writers.map((element) => <div>{element}</div>);
        const starring = this.props.starring.map((element) => <div>{element}</div>);
        return (
            <div className="">
                <div className="mb-3">
                    <div className="col-secundary">Director</div>
                    {directors}
                </div>
                <div className="mb-3">
                    <div className="col-secundary">Writer</div>
                    {writers}
                </div>
                <div className="mb-3">
                    <div className="col-secundary">Starring</div>
                    {starring}
                </div>
            </div>
        );
    }
}

export default FCrewList;

