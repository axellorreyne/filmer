import {Component} from 'react';

class FIconWText extends Component 
{
  render () 
  {
    return (
        <div className="d-flex me-4">
            <img src={this.props.icon} width="32px" class="me-2" alt=""/>
            <div className="ffs-2">{this.props.text}</div> 
        </div>
    );
  }
}

export default FIconWText;
