import React, {Component} from "react";
import {withRouter} from "../tools/WithRouter";
import FFooter from "../components/FFooter.js";
import FHeader from "../components/FHeader";
import FTagList from "../components/FTagList";
import GroupService from "../services/group.service";
import UserService from "../services/user.service";

import RsrcIconStar from "../resources/icon_star.svg"
import FMovieLine from "../components/FMovieLine";
import RsrcDislikeIcon from "../resources/icon_vomit.svg";
import RsrcLikeIcon from "../resources/icon_heart.svg";

class Room extends Component
{

  constructor(props) {
    super(props);
    this.leaveRoom = this.leaveRoom.bind(this);
    this.closeRoom = this.closeRoom.bind(this);
    this.getData = this.getData.bind(this);
    const url = window.location.href;
    const id = url.substring(url.lastIndexOf('/') + 1);
    this.state = {
      group_id: id,
      admin: {id: -1, username: "admin", email: ""},
      isAdmin: false,
      groupname: "",
      movies: [], 
      users: [], 
      loadingMovies: false, 
      error: false, 
    }
  }
    
  componentDidMount()
  {
    document.title = "Filmer: Room";
    GroupService.joinGroup(this.state.group_id).then(
      (data) => {
        this.getData();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  getData()
  {
    this.setState({loadingMovies: true});
    GroupService.getGroup(this.state.group_id).then(
      (data) => 
      {
        UserService.getUser().then(
          (user) => { 
            this.setState({
              isAdmin: (user.id === data.admin.id),
              movies: data.films, 
              users: data.users, 
              groupname: data.name,
              admin: data.admin,
              loadingMovies: false
            });
          },
          (error) => {
            this.setState({error: true, loadingMovies: false});
          }
        );
      },
      (error) =>
      {
        this.setState({error: true, loadingMovies: false});
      }
    );
  }

  leaveRoom()
  {
    GroupService.leaveGroup(this.state.group_id).then(
      (data) => { 
        this.props.navigate("/room");
        window.location.reload();
      },
      (error) => { console.log(error) }
    );
  }
  
  closeRoom()
  {
    GroupService.closeGroup(this.state.group_id).then(
      (data) => { 
        this.props.navigate("/room");
        window.location.reload();
      },
      (error) => { console.log(error) }
    );
  }
  
  render()
  {
    const names_rendered = this.state.users.map(
      (user, index) => {
        const admin = (user.id === this.state.admin.id) ? "(admin)" : "";
        return(
          <div key={index} className="col-12 col-sm-6 col-md-4 pe-3">
            <hr className="my-2"/>
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <div className="ffs-3 ffw-2">{user.username}
                <span className="rgb-2">{" " + admin}</span></div>
              </div>
            </div>
          </div>)
      }
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
      movies_rendered = movies.map((data) => { 
        return <FMovieLine key={data.id} hasReaction={true} movie={data} seen={false} onSeen={{}} onReact={{}}
        hideButtons={true}
       renderInfo={false}
       reactIcon={false}/>
      });
    }

    let leaveButton = <button className="btn btn-danger mt-3 ffs-4" onClick={this.leaveRoom}>Leave Room</button>
    if (this.state.isAdmin)
    {
      leaveButton = <button className="btn btn-danger mt-3 ffs-4" onClick={this.closeRoom}>Close Room</button>
    }
    
    return (
      <div className="h-100 d-flex flex-column m-3 m-xxl-0">
        <FHeader/>
        <main className="mb-5 container-fluid">
          <div className="mt-5 d-lg-flex justify-content-around align-items-center">
            <div className="col-lg-7 mx-md-5 mb-5" >
              <div className="d-flex justify-content-between">  
                <p className="ffs-1 ffw-2 m-0 p-0 me-4">{this.state.groupname} #{this.state.group_id}</p>
                <div>
                  <button className="btn btn-light mt-3 ffs-4 me-3" onClick={this.getData}>Refresh</button>
                  {leaveButton}
                </div>  
              </div>  
              <p className="ffs-2 ffw-2 m-0 p-0 me-4 mt-5">{this.state.users.length} People</p>
              <div className="d-flex justify-content-left flex-wrap">
                {names_rendered}
              </div>
            </div>
          </div>
          <div className="mb-5 d-lg-flex justify-content-around align-items-center">
            <div className="col-lg-7 mx-md-5 mb-5" >
              <p className="ffs-2 ffw-2 m-0 p-0 me-4">Found {movies.length} movies</p>

              <div className="d-flex justify-content-start" style={{flexWrap: 'wrap'}}>
                {movies_rendered}
              </div>
            </div>
          </div>
        </main>
        <FFooter/>
      </div>
    );
  }

}

export default withRouter(Room);

