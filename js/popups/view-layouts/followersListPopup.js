import { AbstractDataPopup } from '../popups.js';

class FollowersListPopup extends AbstractDataPopup {
    constructor(data) {
        components = {
            "popupCancelButton": new PopupCancelButton(),
            "popupOpenElement": new PopupOpenElement()
        };
        super(components, data);
    }

    _generate() {
        // TODO
    }
}