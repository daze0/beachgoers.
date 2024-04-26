import { Listener } from '../../utils/listener.js';

/**
 * PopupOpenElement is a base class for all popup open elements.
 * It provides a method to generate the popup open element.
 * It also provides a method to get the listener.
 * @class PopupOpenElement
 */
class PopupOpenElement {
    #popup;
    #element;
    #listener;

    constructor(popupId, popup) {
        this.#popup = popup;
        this.#element = undefined;
        this.popupOpenCallback = this.popupOpenCallback.bind(this);
        this.#listener = undefined;
    }

    generateComponent() {
        throw new Error("method generateComponent needs implementation");
    }

    getListener() {
        return this.#listener;
    }

    popupOpenCallback() {
        this.#popup.togglePopupState(true);
        this.#popup.render();
    }
}

export { PopupOpenElement };