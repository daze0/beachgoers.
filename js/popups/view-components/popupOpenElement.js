class PopupOpenElement {
    #popup;
    #element;
    #listener;

    constructor(popup) {
        this.#popup = popup;
        this.#element = undefined;
        this.#listener = new Listener("#popupOpenElement", "click", this.#popupOpenCallback);
    }

    generateComponent() {
        return `TODO`;
    }

    getListener() {
        return this.#listener;
    }

    #popupOpenCallback() {
        this.#popup.togglePopupState(true);
    }
}