import { PopupOpenElement } from "../../../popups/view-components/popupOpenElement.js";

class FollowingListElement extends PopupOpenElement {
    constructor(popup) {
        super(popup);
    }

    generateComponent(data) {
        return `
            <div class="row">
                <div class="col-6">
                    ${this._generateReactiveElement('followingListPopupOpen', 'bi-people-fill').outerHTML}
                </div>
                <div class="col-6">
                    <p>${data}</p>
                </div>
            </div>
        `;
    }
}

export { FollowingListElement };