import { AbstractDataPopup } from '../popups.js';
import { PopupCancelButton } from '../view-components/popupCancelButton.js';
import { FollowingListElement } from '../../profile/view-components/profile-info/followingListElement.js';

class FollowingListPopup extends AbstractDataPopup {
    constructor(data) {
        super(data);
        this._setComponent("popupCancelButton", new PopupCancelButton(this));
        this._setComponent("popupOpenElement", new FollowingListElement(this));
    }

    _generate() {
        this._popup = document.createElement('div');
        this._popup.classList.add('modal', 'fade');
        this._popup.id = "followingListPopup";
        this._popup.tabIndex = -1;
        this._popup.setAttribute('aria-labelledby', 'followingListPopupLabel');
        this._popup.setAttribute('aria-hidden', 'true');

        const popupDialog = document.createElement('div');
        popupDialog.classList.add('modal-dialog', 'modal-dialog-scrollable', 'modal-dialog-centered');
        popupDialog.innerHTML = this.#generateFollowingPopupContent(this._data);

        this._popup.appendChild(popupDialog);
        this._popup.appendChild(this._getComponent("popupCancelButton").generateComponent());

        const alreadyPresentPopup = document.getElementById("followingListPopup");
        if (alreadyPresentPopup) {
            document.body.removeChild(alreadyPresentPopup);
        }
        document.body.appendChild(this._popup);
    }

    /*
    REFACTORING NOTES:
    - The following code repeats itself also in followingListPopup class.
    - It would be better to extract this code to the base class AbstractDataPopup.
    */

    #generateFollowingPopupContent(followingList) {
        let content = '<div class="modal-content">';

        if (followingList.length === 0) {
            content += `
                <div class="modal-header px-4">
                    <h2 class="modal-title" id="followingListPopupLabel">No following</h2>
                    ${this._getComponent("popupCancelButton").generateComponent().outerHTML}
                </div>
                <div class="modal-body p-4">
                    Following nobody at the moment
                </div>
            `;
        } else {
            content += `
                <div class="modal-header px-4">
                    <h2>Following</h2>
                    ${this._getComponent("popupCancelButton").generateComponent().outerHTML}
                </div>
            `;
            content += `
                <div class="modal-body p-4">
            `;

            let isFirst = true;
            for (const following of followingList) {
                const followingItem = this.#generateFollowingItem(following);
                if (!isFirst) {
                    content += `
                        <hr />
                        <div class="row">${followingItem}</div>
                    `;
                } else {
                    content += `<div class="row">${followingItem}</div>`;
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

    #generateFollowingItem(following) {
        return `
            <div class="col-4">
                <a class="text-decoration-none text-dark" href="profile.php?uid=${following.userid}">
                    <img class="img-thumbnail h-80 w-80" src="upload/${following.userimg}" alt="Profile Picture">
                </a>
            </div>
            <div class="col-8 d-flex align-items-center justify-content-center">
                <a class="text-decoration-none text-dark" href="profile.php?uid=${following.userid}">
                    <p class="fs-3">${following.username}</p>
                </a>
            </div>
        `;
    }

    _remove() {
        document.body.removeChild(this._popup);
    }
}

export { FollowingListPopup };