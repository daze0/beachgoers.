import { PopupOpenElement } from "../../../popups/view-components/popupOpenElement.js";

class FollowingListElement extends PopupOpenElement {
    constructor(popup) {
        super(popup);
    }

    generateComponent(data) {
        return `
            <div class="d-flex flex-row gx-0">
                <div class="d-flex flex-column me-2">
                    ${this._generateReactiveElement('followingListPopupOpen', 'bi-people-fill', 'user-info-icon-animate').outerHTML}
                </div>
                <div class="d-flex flex-column">
                    <p class="user-info-value">${data}</p>
                </div>
            </div>
        `;
    }
}

export { FollowingListElement };