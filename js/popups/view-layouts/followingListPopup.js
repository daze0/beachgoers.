import { AbstractDataPopup } from '../popups.js';
import { PopupCancelButton } from '../view-components/popupCancelButton.js';
import { FollowingListElement } from '../../profile/view-components/profile-info/FollowingListElement.js';

class FollowingListPopup extends AbstractDataPopup {
    constructor(data) {
        components = {
            "popupCancelButton": new PopupCancelButton(),
            "popupOpenElement": new FollowingListElement()
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

export { FollowingListPopup };