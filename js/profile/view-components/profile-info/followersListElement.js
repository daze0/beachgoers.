import { PopupOpenElement } from "../../../popups/view-components/popupOpenElement.js";

class FollowersListElement extends PopupOpenElement {
    constructor(popup) {
        super(popup);
    }

    generateComponent(data) {
        return `
            <div class="d-flex flex-row gx-0">
                <div class="d-flex flex-column me-2">
                    ${this._generateReactiveElement('followersListPopupOpen', 'bi-people', 'user-info-icon-animate', 'Followers').outerHTML}
                </div>
                <div class="d-flex flex-column">
                    <p class="user-info-value">${data}</p>
                </div>
            </div>
        `;
    }
}

export { FollowersListElement };