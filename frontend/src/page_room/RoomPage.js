import React, {Component} from "react";
import StringSimilarity from "string-similarity";

import FFooter from "../components/FFooter.js";
import FHeader from "../components/FHeader";

import RsrcSearchIcon from "../resources/icon_search.svg";

class FriendsPage extends Component
{

  constructor(probs) {
    super(probs);
    this.setSearchTerm = this.setSearchTerm.bind(this);
    this.getScore = this.getScore.bind(this);
    this.state = 
      {
        roomLeader: "",
      }
  }
    
  componentDidMount()
  {
    document.title = "Filmer: Friends";
  }

  setSearchTerm(fieldData)
  {
    // this.state.searchTerm = fieldData.target.value;
    this.setState({searchTerm: fieldData.target.value});
  }

  getScore(word)
  {
    const searchTerm = this.state.searchTerm.toUpperCase();
    if (searchTerm.length === 0)
    {
      return 1;
    }
    const reference = word.toUpperCase();
    return StringSimilarity.compareTwoStrings(
      reference,
      searchTerm.toUpperCase()) 
      + (reference.includes(searchTerm)? 0.2 : 0); 
  }

  render()
  {
    const names = ["Bob ", "Bob1", "Bob2", "Bobbobbob", "Bob", "Bobobobobob"];
    const names_rendered = names.map((name, index) => 
      <div className="col-12 col-sm-6 col-md-4 pe-3">
        <hr className="my-2"/>
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            {(index == 0) ? 
              <div className="ffs-3 ffw-2 rgb-1">{name} (Admin)</div> :
              <div className="ffs-3 ffw-2 rgb-2">{name}</div>
            }
          </div>
          <button type="button" height="15px" className="btn  btn-outline-danger ffw-1">-</button>
        </div>
      </div>
    );

    return (
      <div className="h-100 d-flex flex-column m-3 m-xxl-0">
        <FHeader/>
        <main className="mb-5 container-fluid">
          <div className="my-5 d-lg-flex justify-content-around align-items-center">
            <div className="col-lg-7 mx-md-5 mb-5" >
              <p className="ffs-1 ffw-2 m-0 p-0 me-4">Room #24654 ({names.length})</p>
              <div className="d-md-flex mt-4 justify-content-between align-items-center mb-2">
                <div className="col-md-6 d-flex align-items-center">
                </div>
              </div>
              <div className="d-flex justify-content-left flex-wrap">
                {names_rendered}
              </div>
            </div>
          </div>
        </main>
        <FFooter/>
      </div>
    );
  }

}

export default FriendsPage;

