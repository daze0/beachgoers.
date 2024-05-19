import { PopupOpenElement } from '../../../popups/view-components/popupOpenElement.js';

class NewPostButton extends PopupOpenElement {

    constructor(popup) {
        super(popup);
    }

    generateComponent(isPersonalProfile) {
        let btn = undefined;
        if (isPersonalProfile) {
            btn = this._generateReactiveButton("newPostButton", "w-100", "bi-plus-circle", "py-3");
        }
        return (btn instanceof HTMLElement) ? btn.outerHTML : "";
    }
}
export { NewPostButton }