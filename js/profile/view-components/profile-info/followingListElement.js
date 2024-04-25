import { PopupOpenElement } from "../../../popups/view-components/popupOpenElement.js";

class FollowingListElement extends PopupOpenElement {
    constructor(popup) {
        super("#followingListPopupOpen", popup);
    }

    generateComponent(data) {
        return `
        <i class='bi bi-people-fill' id="followingListPopupOpen"></i>
        <p>${data}</p>
        `;
    }
}

export { FollowingListElement };