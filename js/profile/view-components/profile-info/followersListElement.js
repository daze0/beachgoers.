import { PopupOpenElement } from "../../../popups/view-components/popupOpenElement";

class FollowersListElement extends PopupOpenElement {
    constructor(popup) {
        super("#followersListPopupOpen", popup);
    }

    generateComponent() {
        return ``;  // TODO: generate div, with svg+data, that triggers list view popup
    }
}

export { FollowersListElement };