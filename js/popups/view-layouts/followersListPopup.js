import { AbstractDataPopup } from '../popups.js';
import { PopupCancelButton } from '../view-components/popupCancelButton.js';
import { FollowersListElement } from '../../profile/view-components/profile-info/followersListElement.js';

class FollowersListPopup extends AbstractDataPopup {
    constructor(data) {
        super(data);
        console.log(this._data);
        this._setComponent("popupCancelButton", new PopupCancelButton(this));
        this._setComponent("popupOpenElement", new FollowersListElement(this));
    }

    _generate() {
        const followersPopupContent = this.#generateFollowersPopupContent(this._data);
        this._popup = document.createElement('div');
        this._popup.innerHTML = followersPopupContent;
        this._popup.classList.add('popup');
        this._popup.appendChild(this._getComponent("popupCancelButton").generateComponent());

        document.body.appendChild(this._popup);
    }

    #generateFollowersPopupContent(followersList) {
        if (followersList.length === 0) {
            return '<h2>No followers</h2>';
        }

        let content = '<h2>Followers</h2>';
        content += '<table>';

        for (const follower of followersList) {
            const followerItem = this.#generateFollowerItem(follower);
            content += `<tr>${followerItem}</tr>`;
        }

        content += '</table>';

        return content;
    }

    #generateFollowerItem(follower) {
        return `
            <td><img src="upload/${follower.userimg}" alt="Profile Picture"></td>
            <td>${follower.username}</td>
        `;
    }

    _remove() {
        document.body.removeChild(this._popup);
    }
}

export { FollowersListPopup };