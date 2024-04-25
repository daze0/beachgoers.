import { Listener } from '../../utils/listener.js';

/**
 * PopupCancelButton represents a popup close button.
 * 
 */
class PopupCancelButton {
    #popup;
    #button;
    #listener;

    constructor(popup) {
        this.#popup = popup;
        this.#button = undefined;
        this.popupCancelCallback = this.popupCancelCallback.bind(this);
        this.#listener = new Listener("#popupCancelButton", "click", this.popupCancelCallback);
    }

    generateComponent() {
        // Create button with same id as the one inside the listener above.
        this.#button = document.createElement("button");
        this.#button.id = "popupCancelButton";
        this.#button.classList.add("close-button");
        this.#button.innerHTML = "&#10006";

        return this.#button;
    }

    getListener() {
        return this.#listener;
    }

    popupCancelCallback() {
        this.#popup.togglePopupState(false);
        this.#popup.render();
    }
}

export { PopupCancelButton };