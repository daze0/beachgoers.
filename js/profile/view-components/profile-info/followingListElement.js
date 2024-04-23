import { PopupOpenElement } from "../../../popups/view-components/popupOpenElement";

class FollowingListElement extends PopupOpenElement {
    constructor(popup) {
        super("#followingListPopupOpen", popup);
    }

    generateComponent() {
        return ``;  // TODO: generate div, with svg+data, that triggers list view popup
    }
}

export { FollowingListElement };