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

    /**
     * Generates a reactive element with the given id and class name.
     * Useful in the case of the event target is not a button.
     * Example use cases: followersListElement, followingListElement.
     * 
     * @param {*} id 
     * @param {*} className 
     * @returns created reactive element.
     */
    _generateReactiveElement(id, className, additionalClass = undefined) {
        this.#element = document.createElement('span');
        this.#element.classList.add('bi', className, "custom-secondary-color", (additionalClass) ? additionalClass : "");
        this.#element.id = id;

        // Accessibility attrs
        this.#element.setAttribute('aria-hidden', 'true');
        this.#element.setAttribute('aria-labelledby', id);
        this.#element.title = id;

        this.#listener = new Listener(`#${this.#element.id}`, "click", this.popupOpenCallback);

        return this.#element;
    }

    /**
     * Generates a reactive button with the given id, class name and icon class name.
     * Example use case: newPostButton.
     * 
     * @param {*} id 
     * @param {*} className 
     * @param {*} iconClassName 
     * @returns created reactive button.
     */
    _generateReactiveButton(id, className, iconClassName, additionalClass = undefined) {
        this.#element = document.createElement('button');
        this.#element.id = id;
        this.#element.classList.add('btn', className);
        if (additionalClass) this.#element.classList.add(additionalClass);
        this.#element.type = 'button';

        // Accessibility attrs
        this.#element.title = id;
        this.#element.setAttribute('aria-hidden', 'true');
        this.#element.setAttribute('aria-label', id);

        this.#element.innerHTML = `<span class="bi ${iconClassName}"></span>`;

        this.#listener = new Listener(`#${this.#element.id}`, "click", this.popupOpenCallback);

        return this.#element;
    }
}

export { PopupOpenElement };