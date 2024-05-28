import { AbstractPopup } from '../popups.js';
import { PopupCancelButton } from '../view-components/popupCancelButton.js';
import { UpdateProfileImgButton } from '../../profile/view-components/profile-info/updateProfileImgButton.js';
import { UpdateProfileImgForm } from '../../profile/view-components/profile-info/updateProfileImgForm.js';

class UpdateProfileImgPopup extends AbstractPopup {
    constructor() {
        super();
        this._setComponent("popupCancelButton", new PopupCancelButton(this));
        this._setComponent("popupOpenElement", new UpdateProfileImgButton(this));
        this._setComponent("updateProfileImgForm", new UpdateProfileImgForm());
    }

    _generate() {
        this._popup = document.createElement('div');
        this._popup.classList.add('modal', 'fade');
        this._popup.id = "updateProfileImgPopup";
        this._popup.tabIndex = -1;
        this._popup.setAttribute('aria-labelledby', 'updateProfileImgLabel');
        this._popup.setAttribute('aria-hidden', 'true');

        const popupDialog = document.createElement('div');
        popupDialog.classList.add('modal-dialog', 'modal-dialog-scrollable', 'modal-dialog-centered');
        popupDialog.innerHTML = this.#generatePopupContent(this._data);

        this._popup.appendChild(popupDialog);
        this._popup.appendChild(this._getComponent("popupCancelButton").generateComponent());

        const alreadyPresentPopup = document.getElementById("updateProfileImgPopup");
        if (alreadyPresentPopup) {
            document.body.removeChild(alreadyPresentPopup);
        }
        document.body.appendChild(this._popup);
    }

    #generatePopupContent(data) {
        let content = '<div class="modal-content">';

        content += `
            <div class="modal-header px-4">
                <h3 class="modal-title" id="updateProfileImgLabel">Update profile image</h3>
                ${this._getComponent("popupCancelButton").generateComponent().outerHTML}
            </div>
        `;

        content += `
            <div class="modal-body p-4">
        `;

        content += this._getComponent("updateProfileImgForm").generateComponent().outerHTML;

        content += "</div>";

        content += "</div>";

        return content;
    }

    _remove() {
        document.body.removeChild(this._popup);
    }
}

export { UpdateProfileImgPopup };