import { PopupOpenElement } from "../../../popups/view-components/popupOpenElement.js";

class FollowersListElement extends PopupOpenElement {
    constructor(popup) {
        super("#followersListPopupOpen", popup);
    }

    generateComponent(data) {
        return `
        <i class='bi bi-people' id="followersListPopupOpen"></i>
        <p>${data}</p>
        `;
    }
}

export { FollowersListElement };