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

    constructor(popup) {
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
        const popupId = this.#popup.getPopupId();
        const modalController = new bootstrap.Modal(document.getElementById(popupId));
        modalController.show();
    }

    _generateReactiveElement(id, className) {
        this.#element = document.createElement('i');
        this.#element.classList.add('bi', className);
        this.#element.id = id;

        this.#listener = new Listener(`#${this.#element.id}`, "click", this.popupOpenCallback);

        return this.#element;
    }
}

export { PopupOpenElement };