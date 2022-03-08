import {Component} from "react";
import axios from "axios";
import { Routes, Route, Link } from "react-router-dom";

class Test extends Component 
{

  componentDidMount() {
    document.title = "Filmer: Where people find their favourite movies!";
  }

  render ()
  {
    return (
<div>
  <h1>test</h1>
</div>
    );
  }

}

export default Test;

