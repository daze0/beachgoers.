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
        const followingPopupContent = this.#generateFollowingPopupContent(this._data);
        this._popup = document.createElement('div');
        this._popup.innerHTML = followingPopupContent;
        this._popup.classList.add('popup');
        this._popup.appendChild(this._getComponent("popupCancelButton").generateComponent());

        document.body.appendChild(this._popup);
    }

    /*
    REFACTORING NOTES:
    - The following code repeats itself also in followersListPopup class.
    - It would be better to extract this code to the base class AbstractDataPopup.
    */

    #generateFollowingPopupContent(followingList) {
        if (followingList.length === 0) {
            return '<h2>No following</h2>';
        }

        let content = '<h2>Following</h2>';
        content += '<table>';

        for (const following of followingList) {
            const followingItem = this.#generateFollowingItem(following);
            content += `<tr>${followingItem}</tr>`;
        }

        content += '</table>';

        return content;
    }

    #generateFollowingItem(following) {
        return `
            <td><img src="upload/profile.png" alt="Profile Picture"></td>
            <td>${following.name}</td>
        `;
    }

    _remove() {
        document.body.removeChild(this._popup);
    }
}

export { FollowingListPopup };