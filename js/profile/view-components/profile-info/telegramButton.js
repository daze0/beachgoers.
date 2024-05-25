import { Listener } from '../../../utils/listener.js';

class TelegramButton {
    #button;
    _listeners;

    constructor() {
        this.#button = undefined;
        this._listeners = {
            //"telegramButtonClick": new Listener("#telegramButton", "click", this.telegramButtonCallback)
        };
    }

    generateComponent(isPersonalProfile, telegramUsername) {
        this.#generateTelegramButton(isPersonalProfile, telegramUsername);
        return (this.#button instanceof HTMLElement) ? this.#button.outerHTML : "";
    }

    getListener(label) {
        return this._listeners[label];
    }

    attachListeners() {
        // WARNING: attach one or the other listener, action must be follow or unfollow only
        const listeners = Object.values(this._listeners);
        listeners.forEach(listener => listener.attachListener());
    }

    #generateTelegramButton(isPersonalProfile, telegramUsername) {
        if (telegramUsername && !isPersonalProfile) {
            this.#button = document.createElement("a");
            this.#button.id = "telegramButton";
            this.#button.type = "button";
            this.#button.classList.add("btn", "mt-2", "mt-lg-0", "ms-lg-2", "d-flex", "flex-row", "justify-content-center", "align-items-center");
            this.#button.innerHTML = "Contact <i class='bi bi-telegram ms-2'></i>";
            this.#button.href = "https://t.me/" + telegramUsername;
            this.#button.target = "_blank";
        }
    }
}

export { TelegramButton }