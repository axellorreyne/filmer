import {Component} from 'react';
import FSolidFriendInviteLine from "./FSolidFriendInviteLine";

class InvitePopup extends Component
{
  getFriends() {
    return [
        "https://inrupt.net/renevds",
        "https://inrupt.net/renevds",
        "https://inrupt.net/renevds",
        "https://inrupt.net/renevds"
    ]
  }

  render ()
  {
    const friends = this.getFriends()

    let rendered = friends.map(friend => {
      return(<FSolidFriendInviteLine url={friend}/>);
    });

    return (
      <div class="modal fade" id="inviteModal" tabindex="-1" aria-labelledby="inviteModalLabel" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable">
          <div class="modal-content text-black">
            <div class="modal-header">
              <h5 class="modal-title" id="inviteModalLabel">Invite Solid friends</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              {rendered}
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary " data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InvitePopup;