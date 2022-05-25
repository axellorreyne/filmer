import React, {Component} from 'react';
import {SessionContext} from "@inrupt/solid-ui-react";
import SolidContactsService from "../services/solid.contacts.service";

class FSolidFriendInviteLine extends Component
{

    static contextType = SessionContext;

    constructor(props) {
        super(props);
        this.invite = this.invite.bind(this);
    }

    invite () {
        SolidContactsService.createInvite(this.context.session, this.props.contact.url, this.props.movie.title);
    }

    render ()
    {
        const url = this.props.contact.name || this.props.contact.url;
        return(
            <div className="d-flex justify-content-between">
                <p className="text text-black m-1">{url}</p>
                <button type="button" className="btn btn-bg-solid hover-bg-solid rgb-bg-solid rgb-1 m-2" onClick={this.invite}>
                    Invite
                </button>
            </div>
        )
    }
}

export default FSolidFriendInviteLine;