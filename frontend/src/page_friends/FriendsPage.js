import React, {Component} from "react";
import stringSimilarity from "string-similarity";

import FFooter from "../components/FFooter.js";
import FHeader from "../components/FHeader";

import RsrcSearchIcon from "../resources/icon_search.svg";

class FriendsPage extends Component
{

  constructor(probs) {
    super(probs);
    // this.state = {searchTerm: "searching terming"}
  }
    
  componentDidMount()
  {
    document.title = "Filmer: Friends";
  }

  setSearchTerm()
  {
    console.log(this.state.searchTerm)
  }

  getScore(word)
  {
    return Math.max.apply(Math, word.map( (x) => 
      stringSimilarity.compareTwoStrings(x, this.state.search_term) 
      + (x.includes(this.state.search_term)? 0.2 : 0))
    );
  }

  render()
  {
    const minimum_likelihood = 0.2;
    var names = ["Bob", "Bob1", "Bob2", "Bobbobbob", "Bob", "Bobobobobob"];
    // names = names.sort((w1,w2) => this.getScore(w2) - this.getScore(w1))
    //   .filter((w) => this.get_score(w) >= minimum_likelihood);

    const names_rendered = names.map((name) => 
      <div className="col-12 col-sm-6 col-md-4 pe-3">
        <hr className="my-2"/>
        <div className="ffs-3 rgb-2 ffw-2 me-3">{name}</div>
      </div>
    );

    return (
      <div className="h-100 d-flex flex-column m-3 m-xxl-0">
        <FHeader/>
        <main className="mb-5 container-fluid">
          <div className="my-5 d-lg-flex justify-content-around align-items-center">
            <div className="col-lg-7 mx-md-5 mb-5" >
              <p className="ffs-1 ffw-2 m-0 p-0 me-4">Friends ({names.length})</p>
              <div className="d-md-flex mt-4 justify-content-between align-items-center mb-2">
                <div className="col-md-6 d-flex align-items-center">
                  <input type="text" className="FFormInput h-50 w-100 my-2" id="search" placeholder="Search"  onChange={this.setSearchTerm}/>
                  <button className="bg-transparent border-0" onClick={this.setSearchTerm}>
                    <img src={RsrcSearchIcon} height="30px" width="30px" className="hover-bg-dark fborder p-2" alt=""/>
                  </button>
                </div>
                <div className="d-flex">
                  <button className="btn btn-primary me-2 p-1 ffw-2 disabled">Add Friend</button>
                  <button className="btn btn-primary p-1 ffw-2 disabled">Create Room</button>
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

