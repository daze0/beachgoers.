import { PopupOpenElement } from '../../../popups/view-components/popupOpenElement.js';

class TelegramConnector extends PopupOpenElement {
    constructor(popup) {
        super(popup);
    }

    generateComponent() {
        const button = this._generateReactiveButton("telegramConnectorButton", "btn", "bi-telegram");
        button.append(" Enable notifications");

        return button.outerHTML;
    }
}
export { TelegramConnector }