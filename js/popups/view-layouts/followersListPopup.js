import { AbstractDataPopup } from '../popups.js';
import { PopupCancelButton } from '../view-components/popupCancelButton.js';
import { FollowersListElement } from '../../profile/view-components/profile-info/followersListElement.js';

class FollowersListPopup extends AbstractDataPopup {
    constructor(data) {
        components = {
            "popupCancelButton": new PopupCancelButton(this),
            "popupOpenElement": new FollowersListElement(this)
        };
        super(components, data);
    }

    _generate() {
        const followersPopupContent = this.#generateFollowersPopupContent(this._data);
        this._popup = document.createElement('div');
        this._popup.innerHTML = followersPopupContent;
        this._popup.classList.add('popup');
        this._popup.appendChild(this._components["popupCancelButton"].generateComponent());

        document.body.appendChild(this._popup);
    }

    #generateFollowersPopupContent(followersList) {
        let content = '<h2>Followers</h2>';
        content += '<table>';

        for (const follower of followersList) {
            const followerItem = generateFollowerItem(follower);
            content += `<tr>${followerItem}</tr>`;
        }

        content += '</table>';

        return content;
    }

    #generateFollowerItem(follower) {
        return `
            <td><img src="upload/profile.png" alt="Profile Picture"></td>
            <td>${follower.name}</td>
        `;
    }

    _remove() {
        document.body.removeChild(this._popup);
    }
}

export { FollowersListPopup };