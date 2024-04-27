import { PopupOpenElement } from "../../../popups/view-components/popupOpenElement.js";

class FollowersListElement extends PopupOpenElement {
    constructor(popup) {
        super(popup);
    }

    generateComponent(data) {
        return `
            <div class="row">
                <div class="col-6">
                    ${this._generateReactiveElement('followersListPopupOpen', 'bi-people').outerHTML}
                </div>
                <div class="col-6">
                    <p>${data}</p>
                </div>
            </div>
        `;
    }
}

export { FollowersListElement };