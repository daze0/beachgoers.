import { AbstractPopup } from '../popups.js';
import { PopupCancelButton } from '../view-components/popupCancelButton.js';
import { NewPostButton } from '../../profile/view-components/profile-feed/newPostButton.js';
import { NewPostForm } from '../../profile/view-components/profile-feed/newPostForm.js';

class NewPostPopup extends AbstractPopup {
    constructor() {
        super();
        this._setComponent("popupCancelButton", new PopupCancelButton(this));
        this._setComponent("popupOpenElement", new NewPostButton(this));
        this._setComponent("newPostForm", new NewPostForm());
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

        content += `
            <div class="modal-header px-4">
                <h3 class="modal-title" id="newPostPopupLabel">Write a post</h3>
                ${this._getComponent("popupCancelButton").generateComponent().outerHTML}
            </div>
        `;

        content += `
            <div class="modal-body p-4">
        `;

        content += this._getComponent("newPostForm").generateComponent().outerHTML;

        content += "</div>";

        content += "</div>";

        return content;
    }

    _remove() {
        document.body.removeChild(this._popup);
    }
}

export { NewPostPopup };