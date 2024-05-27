import { AbstractDataPopup } from '../popups.js';
import { PopupCancelButton } from '../view-components/popupCancelButton.js';
import { FollowersListElement } from '../../profile/view-components/profile-info/followersListElement.js';

class FollowersListPopup extends AbstractDataPopup {
    constructor(data) {
        super(data);
        this._setComponent("popupCancelButton", new PopupCancelButton(this));
        this._setComponent("popupOpenElement", new FollowersListElement(this));
    }

    _generate() {
        this._popup = document.createElement('div');
        this._popup.classList.add('modal', 'fade');
        this._popup.id = "followersListPopup";
        this._popup.tabIndex = -1;
        this._popup.setAttribute('aria-labelledby', 'followersListPopupLabel');
        this._popup.setAttribute('aria-hidden', 'true');

        const popupDialog = document.createElement('div');
        popupDialog.classList.add('modal-dialog', 'modal-dialog-scrollable', 'modal-dialog-centered');
        popupDialog.innerHTML = this.#generateFollowersPopupContent(this._data);

        this._popup.appendChild(popupDialog);
        this._popup.appendChild(this._getComponent("popupCancelButton").generateComponent());

        const alreadyPresentPopup = document.getElementById("followersListPopup");
        if (alreadyPresentPopup) {
            document.body.removeChild(alreadyPresentPopup);
        }
        document.body.appendChild(this._popup);
    }

    #generateFollowersPopupContent(followersList) {
        let content = '<div class="modal-content">';

        if (followersList.length === 0) {
            content += `
                <div class="modal-header px-4">
                    <h2 class="modal-title" id="followersListPopupLabel">No followers</h2>
                    ${this._getComponent("popupCancelButton").generateComponent().outerHTML}
                </div>
                <div class="modal-body p-4">
                    No followers yet
                </div>
            `;
        } else {
            content += `
                <div class="modal-header px-4">
                    <h2>Followers</h2>
                    ${this._getComponent("popupCancelButton").generateComponent().outerHTML}
                </div>
            `;
            content += `
                <div class="modal-body p-4">
            `;

            let isFirst = true;
            for (const follower of followersList) {
                const followerItem = this.#generateFollowerItem(follower);
                if (!isFirst) {
                    content += `
                        <hr />
                        <div class="row">${followerItem}</div>
                    `;
                } else {
                    content += `<div class="row">${followerItem}</div>`;
                    isFirst = false;
                }

            }

            content += `
                </div>
            `;
        }

        content += "</div>";

        return content;
    }

    #generateFollowerItem(follower) {
        return `
            <div class="col-4">
                <a class="text-decoration-none text-dark" href="profile.php?uid=${follower.userid}">
                    <img class="img-thumbnail h-80 w-80" src="upload/${follower.userimg}" alt="Profile Picture">
                </a>
            </div>
            <div class="col-8 d-flex align-items-center justify-content-center">
                <a class="text-decoration-none text-dark" href="profile.php?uid=${follower.userid}">
                    <p class="fs-3">${follower.username}</p>
                </a>
            </div>
        `;
    }

    _remove() {
        document.body.removeChild(this._popup);
    }
}

export { FollowersListPopup };