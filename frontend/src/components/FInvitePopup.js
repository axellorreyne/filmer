import {Component} from 'react';
import FSolidFriendInviteLine from "./FSolidFriendInviteLine";
import SolidContactsService from "../services/solid.contacts.service";
import {SessionContext} from "@inrupt/solid-ui-react";

class InvitePopup extends Component {

    static contextType = SessionContext;

    constructor(props) {
      super(props);
      this.state = {contacts: []}
    }

    componentDidMount() {
        SolidContactsService.getAllContacts(this.context.session).then(contacts => this.setState({contacts}))
    }

    render() {
        let rendered = this.state.contacts.map(friend => {
            return (<FSolidFriendInviteLine key={friend.url} contact={friend} movie={this.props.movie}/>);
        });
        return (
            <div className="modal fade" id="inviteModal" tabIndex="-1" aria-labelledby="inviteModalLabel" role="dialog"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content text-black">
                        <div className="modal-header">
                            <h5 className="modal-title" id="inviteModalLabel">Invite Solid friends</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {rendered}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary " data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

export default InvitePopup;