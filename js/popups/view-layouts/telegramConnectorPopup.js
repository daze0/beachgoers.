import { AbstractDataPopup } from '../popups.js';
import { PopupCancelButton } from '../view-components/popupCancelButton.js';
import { TelegramConnector } from '../../profile/view-components/profile-info/telegramConnector.js';
import { telegramEnableNotificationsButton } from '../../profile/view-components/profile-info/telegramEnableNotificationsButton.js';

class TelegramConnectorPopup extends AbstractDataPopup {
    constructor(data) {
        super(data);
        this._setComponent("popupCancelButton", new PopupCancelButton(this));
        this._setComponent("popupOpenElement", new TelegramConnector(this));
        this._setComponent("telegramEnableNotificationsButton", new telegramEnableNotificationsButton());
    }

    _generate() {
        this._popup = document.createElement('div');
        this._popup.classList.add('modal', 'fade');
        this._popup.id = "telegramConnectorPopup";
        this._popup.tabIndex = -1;
        this._popup.setAttribute('aria-labelledby', 'telegramConnectorPopupLabel');
        this._popup.setAttribute('aria-hidden', 'true');

        const popupDialog = document.createElement('div');
        popupDialog.classList.add('modal-dialog', 'modal-dialog-scrollable', 'modal-dialog-centered');
        popupDialog.innerHTML = this.#generateTelegramConnectorPopupContent(this._data);

        this._popup.appendChild(popupDialog);
        this._popup.appendChild(this._getComponent("popupCancelButton").generateComponent());

        const alreadyPresentPopup = document.getElementById("telegramConnectorPopup");
        if (alreadyPresentPopup) {
            document.body.removeChild(alreadyPresentPopup);
        }
        document.body.appendChild(this._popup);
    }

    #generateTelegramConnectorPopupContent() {
        let content = '<div class="modal-content">';

        content += `
            <div class="modal-header px-4">
                <h2>Enable notifications</h2>
                ${this._getComponent("popupCancelButton").generateComponent().outerHTML}
            </div>
        `;
        content += `
            <div class="modal-body p-4">
        `;

        content += `
            <div id="telegram-connector-instructions">
                <p>Steps to enable telegram notifications:</p>
                <ol>
                    <li>Open the telegram bot chat -> ${this.#generateTelegramBotChatLink()}</li>
                    <li>Activate the bot</li>
                    <li>Click "Enable notification"</li>
                </ol>
            </div>
        `;
        
        content += this.#generateEnableNotificationsButton();

        content += `<div id="telegram-enable-notifications-result"></div>`;

        content += `
            </div>
        `;

        content += "</div>";

        return content;
    }

    #generateTelegramBotChatLink(){
        const telegramBotUsername = "BeachgoersBot";
        const button = document.createElement("a");
        button.id = "openTelegramBotChatButton";
        button.type = "button";
        //button.classList.add("btn");
        button.innerHTML = "<span class='bi bi-telegram'></span>";
        button.href =  "https://t.me/"+telegramBotUsername;
        button.target =  "_blank";
        return button.outerHTML;
    }

    #generateEnableNotificationsButton(){
        return this._getComponent("telegramEnableNotificationsButton").generateComponent();
    }

    _remove() {
        document.body.removeChild(this._popup);
    }
}

export { TelegramConnectorPopup };