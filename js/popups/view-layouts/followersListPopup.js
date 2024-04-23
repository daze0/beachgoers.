import { AbstractDataPopup } from '../popups.js';
import { PopupCancelButton } from '../view-components/popupCancelButton.js';
import { FollowersListElement } from '../../profile/view-components/profile-info/followersListElement.js';

class FollowersListPopup extends AbstractDataPopup {
    constructor(data) {
        components = {
            "popupCancelButton": new PopupCancelButton(),
            "popupOpenElement": new FollowersListElement()
        };
        super(components, data);
    }

    _generate() {
        // TODO
    }

    _remove() {
        // TODO
    }
}

export { FollowersListPopup };