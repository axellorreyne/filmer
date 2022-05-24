import {Component} from 'react';

class InvitePopup extends Component
{
  render ()
  {
    return (
      <div class="modal fade" id="inviteModal" tabindex="-1" aria-labelledby="inviteModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>friend list</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary " data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-dark hover-bg-solid rgb-bg-solid" data-bs-dismiss="modal">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InvitePopup;