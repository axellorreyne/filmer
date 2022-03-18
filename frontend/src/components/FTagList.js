import {Component} from 'react';

class FTagList extends Component 
{

  render () 
  {
    const tags = this.props.tags.map((element) => 
      <div className="px-1 mt-2 me-2 bg-light rounded ffw-2 rgb-bg-gr">
      {element}
      </div>
    );
    return (
      <div className="ftags my-1 mb-1 d-flex flex-wrap">
      {tags}
      </div>
    );
  }
}

export default FTagList;
