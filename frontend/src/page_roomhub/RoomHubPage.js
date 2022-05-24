import React, { Component } from "react";
import { Link } from "react-router-dom";
import {withRouter} from "../tools/WithRouter";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import GroupService from "../services/group.service";

import FFooter from "../components/FFooter.js";
import FHeader from "../components/FHeader";

function requiredValidationTest(value)
{
  return((value) ? undefined : 
    (<div className="rgb-alert" role="alert">This field is required!</div>));
}

function roomIdValidationTest(value)
{
  let result = undefined;
  if (value.length !== 6)
  {
    result = <div className="rgb-alert mb-2" role="alert">id is not the correct length</div>;
  }
  return(result);
}

function roomNameValidationTest(value)
{
  let result = undefined;
  if (value.length > 42)
  {
    result = <div className="rgb-alert mb-2" role="alert">id is not the correct length</div>;
  }
  return(result);
}

class RoomHub extends Component {
  
  constructor(props) 
  {
    super(props);
    this.buttonSetStateRoomId = this.buttonSetStateRoomId.bind(this);
    this.buttonSetStateRoomName = this.buttonSetStateRoomName.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.inGroup = this.inGroup.bind(this);
    this.state = 
      {
        roomId: "",
        roomName: "",
        loading: false,
        message: "",
        groups: [{group_id: 'c289ec', admin: 3, name: 'group1'}],
      }
    this.inGroup()
  }   

  buttonSetStateRoomId(button)
  {
    this.setState({roomId: button.target.value}) ;
  }
  
  buttonSetStateRoomName(button)
  {
    this.setState({roomName: button.target.value});
  }

  inGroup()
  {
    GroupService.inGroup().then(
      (group_ids) => { 
        this.setState({groups: group_ids});
      },
      (error) => {console.log("error: ", error)}
    );
  }

  createRoom(form)
  {
    form.preventDefault();
    this.setState({message: "", loading: true})
    this.formCreate.validateAll();
    if (this.checkBtnCreate.context._errors.length === 0) 
    {
      GroupService.createGroup(this.state.roomName).then(
        (data) => 
        {
          this.setState({loading: false});
          this.props.navigate("/room/" + data.group_id);
          window.location.reload();
        },
        (error) => 
        {
          this.setState({loading: false});
        }
      );
    }
    else 
    {
      console.log("error");
      this.setState({loading: false});
    }
  }

  joinRoom(form)
  {
    form.preventDefault();
    this.setState({message: "", loading: true})
    this.formJoin.validateAll();
    if (this.checkBtnJoin.context._errors.length === 0)
    {
      this.setState({loading: false});
      this.props.navigate("/room/" + this.state.roomId);
      window.location.reload();
    }
    else 
    {
      this.setState({loading: false});
    }
  }
  
  render() {
    return (
<div className="h-100 d-flex flex-column m-3 m-xxl-0">
  <FHeader/>
  <main className="mb-5 container-fluid">
    <div className="my-5 d-lg-flex justify-content-around align-items-center">
      <div className="col-lg-7 mx-md-5 mb-5" >
        <p className="ffs-1 ffw-2 m-0 p-0 me-4">Groups</p>
        <h2 className="rgb-1 ffw-2 ffs-3 mb-3 mb-4 mt-3">Join a group with your friends to find movies you all like!</h2>
        <hr/> 
        <div className="">
          <Form onSubmit={this.joinRoom} ref={form => this.formJoin = form} className="d-flex me-4">
            <Input type="text" name="room-id" className="FFormInput col-9 w-100" placeholder="Group id"
              value={this.state.roomId} onChange={this.buttonSetStateRoomId} validations={[requiredValidationTest, roomIdValidationTest]}/>
            <div className="form-group">
              <button disabled={this.state.loading} className="btn btn-primary ms-3 mb-3">
                {this.state.loading && <span className="spinner-border spinner-border-sm"/>}
                {!this.state.loading && <span>Join Group</span>}
              </button>
            </div>
            <CheckButton style={{ display: "none" }} ref={c => { this.checkBtnJoin = c; }} />
          </Form>
          <Form onSubmit={this.createRoom} ref={form => this.formCreate = form} className="d-flex mb-4">
            <Input type="text" name="room-name" className="FFormInput me-3" placeholder="Groupname"
               value={this.state.roomName} onChange={this.buttonSetStateRoomName} validations={[requiredValidationTest, roomNameValidationTest]}/>
            <div className="form-group">
              <button className="btn btn-primary" disabled={this.state.loading} >
                {this.state.loading && <span className="spinner-border spinner-border-sm"/>}
                {!this.state.loading && <span>Create Group</span>}
              </button>
            </div>
            <CheckButton style={{ display: "none" }} ref={c => { this.checkBtnCreate = c; }} />
          </Form>
        </div>
        <h2 className="mt-5 mb-4">Current Groups ({this.state.groups.length})</h2>
        <div>
          {this.state.groups.map((group, index) => 
            <div key={index}>
              <hr/>
              <div className="d-flex align-items-center justify-content-between">
                <label className="ffw-2 ffs-2">{group.name} (#{group.group_id})</label>
                <Link to={group.group_id}><button className="btn btn-light px-5 ffw-2">enter</button></Link>
              </div> 
            </div> 
          )}
        </div>
      </div>
    </div>
  </main>
  <FFooter/>
</div>
        );
    }
}

export default withRouter(RoomHub);
