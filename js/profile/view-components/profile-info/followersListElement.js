import { PopupOpenElement } from "../../../popups/view-components/popupOpenElement.js";

class FollowersListElement extends PopupOpenElement {
    constructor(popup) {
        super("#followersListPopup", popup);
    }

    generateComponent(data) {
        return `
        <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#followersListPopup">
            <i class='bi bi-people'></i>
            <p>${data}</p>
        </button>
        `;
    }
}

export { FollowersListElement };