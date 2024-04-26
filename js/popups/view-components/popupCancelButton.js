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
        this.#listener = undefined;
    }

    generateComponent() {
        this.#button = document.createElement('button');
        this.#button.type = 'button';
        this.#button.classList.add('btn-close');
        this.#button.setAttribute('data-bs-dismiss', 'modal');
        this.#button.setAttribute('aria-label', 'Close');
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