import { Listener } from '../../../utils/listener.js';

class NewPostButton {
    #newPostButton;
    _listeners;

    constructor() {
        this.#newPostButton = undefined;
        this._listeners = {
            "newPostButtonClick": new Listener("#newPostButton", "click", this.newPostButtonCallback)
        };
    }

    generateComponent(isPersonalProfile) {
        this.#generateNewPostButton(isPersonalProfile);
        return (this.#newPostButton instanceof HTMLElement) ? this.#newPostButton.outerHTML : "";
    }

    newPostButtonCallback() {
       //TODO IMPLEMENT
    }

    getListener(label) {
        return this._listeners[label];
    }

    attachListeners() {
        const listeners = Object.values(this._listeners);
        listeners.forEach(listener => listener.attachListener());
    }

    #generateNewPostButton(isPersonalProfile) {
        if(isPersonalProfile){
            this.#newPostButton = document.createElement("button");
            this.#newPostButton.id = "newPostButton";
            this.#newPostButton.type = "button";
            this.#newPostButton.classList.add("btn");
            this.#newPostButton.innerHTML = "<i class='bi bi-plus-circle'></i>";
        }
    }
}
export { NewPostButton }