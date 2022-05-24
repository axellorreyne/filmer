import {Component} from 'react';

class FTagList extends Component 
{

  render () 
  {
    const tags = this.props.tags.map((element) => 
      <div key={element} className="px-1 me-2 bg-light rounded ffw-2 rgb-bg-gr">
      {element}
      </div>
    );
    return (
      <div className="ftags d-flex flex-wrap">
      {tags}
      </div>
    );
  }
}

export default FTagList;
