class PopupCancelButton {
    #popup;
    #button;
    #listener;

    constructor(popup) {
        this.#popup = popup;
        this.#button = undefined;
        this.#listener = new Listener("#popupCancelButton", "click", this.#popupCancelCallback);
    }

    generateComponent() {
        return `TODO`;
    }

    getListener() {
        return this.#listener;
    }

    #popupCancelCallback() {
        this.#popup.togglePopupState(false);
        this.#popup.render();
    }
}

export { PopupCancelButton };