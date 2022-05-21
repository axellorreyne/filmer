import React, {Component} from "react";
import {withRouter} from "../tools/WithRouter";
import FFooter from "../components/FFooter.js";
import FHeader from "../components/FHeader";
import FTagList from "../components/FTagList";
import GroupService from "../services/group.service";

import RsrcIconStar from "../resources/icon_star.svg"

class Room extends Component
{

  constructor(props) {
    super(props);
    this.leaveRoom = this.leaveRoom.bind(this);
    const url = window.location.href;
    const id = url.substring(url.lastIndexOf('/') + 1);
    this.state = {movies: [], names: [], error: false, 
      loadingMovies: false, id: id,}
  }
    
  componentDidMount()
  {
    console.log(window.location.href);
    this.setState({loadingMovies: true});
    GroupService.getGroup(this.state.id).then(
      (data) => 
      {
        this.setState({
          movies: data.films, 
          names: data.usernames, 
          loadingMovies: false});
      },
      (error) =>
      {
        this.setState({error: true, loadingMovies: false});
      }
    );
    document.title = "Filmer: Room";
  }

  leaveRoom()
  {
    console.log("leaving room")  
    GroupService.leaveGroup(this.state.id).then(
      (data) => { 
        this.props.navigate("/room");
        window.location.reload();
      },
      (error) => { console.log("error") }
    );
  }
  
  render()
  {
    const names = this.state.names; 
    const names_rendered = names.map((name, index) => 
      <div className="col-12 col-sm-6 col-md-4 pe-3">
        <hr className="my-2"/>
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <div className="ffs-3 ffw-2 rgb-2">{name}</div>
          </div>
        </div>
      </div>
    );
   
    const movies = this.state.movies;
    let movies_rendered = <p className="mt-5 rgb-alert ffs-2 ffw-2 text-center">Failed to load movies :(</p>;
    if (this.state.loadingMovies)
    {
      movies_rendered = <div className="d-flex justify-content-center mt-5">
        <span className="spinner-border spinner-border-sm"/></div>;
    }
    else if (movies.length === 0)
    {
      movies_rendered = <p className="mt-5 ffs-2 ffw-2 text-center">No overlapping movies</p>;
    }
    else if (!this.state.error)
    {
      console.log(this.state.movies)
      movies_rendered = movies.map((data) => { 
        const title = data.original_title; 
        const director = data.credits.crew.filter(x=>x.job==="Director")
          .slice(0,3).map(x => x.name).sort().join(", ");
        const score = data.vote_average.toFixed(1)
        const tags = data.genres.map(genre=>genre.name).slice(0,3);
        return(
          <div>
            <hr className="my-md-2"/>
            <div className="ffs-2 ffw-2 me-3">{title}</div>
            <div className="rgb-2">{director}</div>
            <div className="d-flex justify-content-between align-items-end mt-2">
              <FTagList tags={tags}/>
              <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center me-3">
                  <img src={RsrcIconStar} width="18px" className="me-2" alt=""/>
                  {score}
                </div>
              </div>
            </div>
          </div>
        );
      });
    }
    return (
      <div className="h-100 d-flex flex-column m-3 m-xxl-0">
        <FHeader/>
        <main className="mb-5 container-fluid">
          <div className="mt-5 d-lg-flex justify-content-around align-items-center">
            <div className="col-lg-7 mx-md-5 mb-5" >
              <div className="d-flex justify-content-between">  
                <p className="ffs-1 ffw-2 m-0 p-0 me-4">Room #{this.state.id}</p>
                <button className="btn btn-danger mt-3 ffs-4" onClick={this.leaveRoom}>Leave Room</button>
              </div>  
              <p className="ffs-2 ffw-2 m-0 p-0 me-4 mt-5">{names.length} People</p>
              <div className="d-flex justify-content-left flex-wrap">
                {names_rendered}
              </div>
            </div>
          </div>
          <div className="mb-5 d-lg-flex justify-content-around align-items-center">
            <div className="col-lg-7 mx-md-5 mb-5" >
              <p className="ffs-2 ffw-2 m-0 p-0 me-4">Found {movies.length} movies</p>
              {movies_rendered} 
            </div>
          </div>
        </main>
        <FFooter/>
      </div>
    );
  }

}

export default withRouter(Room);

