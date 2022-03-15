import {Component} from 'react';

import RsrcLogo from "../resources/logo_transparant.svg";

class FHeader extends Component 
{
  render () 
  {
    return (
<div className="text-center mt-auto mb-4">
    <img src={RsrcLogo} width="200p" alt=""/>
</div>
    );
  }
}

export default FHeader;
