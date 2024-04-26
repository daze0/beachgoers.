import { PopupOpenElement } from "../../../popups/view-components/popupOpenElement.js";

class FollowingListElement extends PopupOpenElement {
    constructor(popup) {
        super("#followingListPopup", popup);
    }

    generateComponent(data) {
        return `
        <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#followingListPopup">
            <i class='bi bi-people-fill'></i>
            <p>${data}</p>
        </button>
        `;
    }
}

export { FollowingListElement };