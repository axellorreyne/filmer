import {Component} from 'react';

class FTagList extends Component 
{

    render () 
    {
        const tags = this.props.tags.map((element) => 
            <div className="FTag px-1 me-2 bg-light rounded ffw-2">
                {element}
            </div>
        );
        return (
            <div className="ftags mt-2 mb-1 d-flex">
                {tags}
            </div>
        );
    }
}

export default FTagList;
