import { Listener } from '../../../utils/listener.js';

class FollowButton {
    #button;
    _listeners;

    constructor() {
        this.#button = undefined;
        this._listeners = {
            "followButtonClick": new Listener("#followButton", "click", this.followButtonCallback),
            //"unfollowButtonClick": new Listener("#followButton", "click", this.unfollowButtonCallback)
        };
    }

    generateComponent(data) {
        this.#generateFollowButton(data["personal_profile"], data["follow_status"]);
        return (this.#button instanceof HTMLElement) ? this.#button.outerHTML : "";
    }

    followButtonCallback() {

    }

    unfollowButtonCallback() {

    }

    getListener(label) {
        return this._listeners[label];
    }

    attachListeners() {
        // WARNING: attach one or the other listener, action must be follow or unfollow only
        const listeners = Object.values(this._listeners);
        listeners.forEach(listener => listener.attachListener());
    }

    #generateFollowButton(isPersonalProfile, followStatus) {
        if (!isPersonalProfile) {
            this.#button = document.createElement("button");
            this.#button.id = "followButton";
            this.#button.type = "button";
            this.#button.classList.add("btn");
            if (!followStatus) {
                this.#button.textContent = "Follow";
            } else {
                this.#button.textContent = "Unfollow";
            }
        }
    }
}

export { FollowButton }
