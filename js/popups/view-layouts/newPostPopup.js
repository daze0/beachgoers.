import { AbstractPopup } from '../popups.js';
import { PopupCancelButton } from '../view-components/popupCancelButton.js';
import { NewPostButton } from '../../profile/view-components/profile-feed/newPostButton.js';

class NewPostPopup extends AbstractPopup {
    constructor() {
        super();
        this._setComponent("popupCancelButton", new PopupCancelButton(this));
        this._setComponent("popupOpenElement", new NewPostButton(this));
    }

    _generate() {
        this._popup = document.createElement('div');
        this._popup.classList.add('modal', 'fade');
        this._popup.id = "newPostPopup";
        this._popup.tabIndex = -1;
        this._popup.setAttribute('aria-labelledby', 'newPostPopupLabel');
        this._popup.setAttribute('aria-hidden', 'true');

        const popupDialog = document.createElement('div');
        popupDialog.classList.add('modal-dialog', 'modal-dialog-scrollable', 'modal-dialog-centered');
        popupDialog.innerHTML = this.#generateNewPostPopupContent(this._data);

        this._popup.appendChild(popupDialog);
        this._popup.appendChild(this._getComponent("popupCancelButton").generateComponent());

        const alreadyPresentPopup = document.getElementById("newPostPopup");
        if (alreadyPresentPopup) {
            document.body.removeChild(alreadyPresentPopup);
        }
        document.body.appendChild(this._popup);
    }

    #generateNewPostPopupContent(data) {
        let content = '<div class="modal-content">';

        content += "new post form..."

        content += "</div>";

        return content;
    }

    _remove() {
        document.body.removeChild(this._popup);
    }
}

export { NewPostPopup };