import { PopupOpenElement } from '../../../popups/view-components/popupOpenElement.js';

class UpdateProfileImgButton extends PopupOpenElement {

    constructor(popup) {
        super(popup);
    }

    generateComponent(isPersonalProfile) {
        let btn = undefined;
        if (isPersonalProfile) {
            btn = this._generateReactiveButton("updateProfileImgButton", "position-absolute", "bi-pen", "edit-profile-picture-btn", "Update profile image");
        }
        return (btn instanceof HTMLElement) ? btn.outerHTML : "";
    }
}
export { UpdateProfileImgButton }