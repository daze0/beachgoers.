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
        // Create button with same id as the one inside the listener above.
        return `<button class="close-button" id="popupCancelButton">&#10006</button>`;
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