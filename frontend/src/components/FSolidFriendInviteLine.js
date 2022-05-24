import React, {Component} from 'react';

class FSolidFriendInviteLine extends Component
{

    constructor(props) {
        super(props);
        this.invite = this.invite.bind(this);
    }

    invite () {
        console.log("invited ", this.props.url);
    }

    render ()
    {
        const url = this.props.url;
        return(
            <div className="d-flex align-items-center">
                <p className="text text-black m-1">{url}</p>
                <button type="button" className="btn btn-bg-solid hover-bg-solid rgb-bg-solid rgb-1 m-2" onClick={this.invite}>
                    Invite
                </button>
            </div>
        )
    }
}

export default FSolidFriendInviteLine;