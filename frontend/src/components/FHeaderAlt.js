import {Component} from 'react';

import RsrcLogo from "../resources/logo_transparant.svg";

class FHeader extends Component 
{
  render () 
  {
    return (
<div className="text-center mb-auto">
    <img src={RsrcLogo} width="100px"/>
</div>
    );
  }
}

export default FHeader;
