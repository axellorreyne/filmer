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
    this.executeSearch = this.executeSearch.bind(this);
    this.getScore = this.getScore.bind(this);
    this.state = 
      {
        searchTerm: "", 
        names: ["Bob", "Bob1", "Bob2", "Bobbobbob", "Bob", "Bobobobobob", "vim", "Elias"],
        search: false
      }
  }
    
  componentDidMount()
  {
    document.title = "Filmer: Friends";
  }

  setSearchTerm(fieldData)
  {
    this.state.searchTerm = fieldData.target.value;
    // this.setState({searchTerm: fieldData.target.value});
  }

  executeSearch(buttonData)
  {
    this.setState({search: true});
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
    const minimum_likelihood = 0.2;
    let names = this.state.names;
    if (this.state.search)
    {
      names = names.sort((w1,w2) => this.getScore(w2) - this.getScore(w1))
        .filter((w) => this.getScore(w) >= minimum_likelihood);
      this.state.search = false;
    }

    const names_rendered = names.map((name) => 
      <div className="col-12 col-sm-6 col-md-4 pe-3">
        <hr className="my-2"/>
        <div className="d-flex justify-content-between">
          <div className="ffs-3 rgb-2 ffw-2 me-3">{name}</div>
          <button type="button" width="12px" height="12px" className="btn btn-outline-danger ffw-1">-</button>
        </div>
      </div>
    );

    let namesSearch = [
      "vim", 
      "vim", 
      "vim", 
      "vim", 
      "vim", 
      "vim", 
      "Elias"
    ];
    let addFriendButton = (x) => 
    {
      if (names.includes(x)) {
        return  <button type="button" className="btn btn-outline-danger ffw-1">-</button>
      }
      return <button type="button" className="btn btn-success ffw-1">+</button>
    }
    const friends_result_rendered = namesSearch.map((name) =>
      <div className="">
        <hr className="my-2"/>
        <div className="d-flex justify-content-between">
          <div className="ffs-3 rgb-2 ffw-2 me-3">{name}</div>
          {addFriendButton(name)}
        </div>
      </div>
    );

    // TODO (Elias): Search currently working without the button, do we need to implement this or not?
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
                  <button className="bg-transparent border-0" onClick={this.executeSearch}>
                    <img src={RsrcSearchIcon} height="30px" width="30px" className="hover-bg-dark fborder p-2" alt=""/>
                  </button>
                </div>
                <div className="d-flex">
                  <button className="btn btn-primary me-2 p-1 ffw-2" data-bs-toggle="modal" data-bs-target="#addFriendModal">Add Friend</button>
                  <button className="btn btn-primary p-1 ffw-2 disabled">Create Room</button>
                </div>
              </div>
              <div className="d-flex justify-content-left flex-wrap">
                {names_rendered}
              </div>
            </div>
          </div>

          <div className="modal fade mt-5" id="addFriendModal">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content rgb-bg-2 fborder p-3">
                <h5 className="mb-2">Add Friend</h5>
                <div className="d-flex"> 
                  <input type="text" className="FFormInput h-50 w-100 my-2" id="search" placeholder="Search"  onChange={this.setSearchTerm}/>
                  <button className="bg-transparent border-0" onClick={this.setSearchTerm}>
                    <img src={RsrcSearchIcon} height="30px" width="30px" className="hover-bg-dark fborder p-2" alt=""/>
                  </button>
                </div>
                <div>
                  {friends_result_rendered}
                  <hr className="my-2"/>
                </div>
                <button type="button" className="col-2 btn btn-primary mt-4" data-bs-dismiss="modal">Done</button>
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

