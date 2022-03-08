import {Component} from 'react';

import RsrcLogo from "../resources/logo_transparant.svg";

class FHeader extends Component 
{
  render () 
  {
    return (
<nav class="navbar">
  <img src={RsrcLogo} width="120px"/>
  <h1>This is a header</h1>
  <h1>This is a header</h1>
</nav>
    );
  }
}

export default FHeader;
