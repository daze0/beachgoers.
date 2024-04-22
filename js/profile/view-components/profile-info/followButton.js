import { Listener } from '../../../utils/listener.js';

class FollowButton {
    #followButton;
    #unfollowButton;
    _listeners;

    constructor() {
        this.#followButton = undefined;
        this.#unfollowButton = undefined;
        this._listeners = {
            "followButtonClick": new Listener("#followButton", "click", this.followButtonCallback),
            "unfollowButtonClick": new Listener("#unfollowButton", "click", this.unfollowButtonCallback)
        };
    }

    generateComponent(personal_profile, follow_status) {
        this.#generateFollowButton(personal_profile, follow_status);
        this.#generateUnfollowButton(personal_profile, follow_status);
        if(personal_profile){
            return "";
        }
        return this.#followButton.outerHTML+this.#unfollowButton.outerHTML;
    }

    followButtonCallback() {
        axios.get("api/api-profile.php?follow=true").then(response => {
           document.getElementById("followButton").classList.add("d-none");
           document.getElementById("unfollowButton").classList.remove("d-none");
        }).catch(error => {
            console.log("Error detected while following: " + error);
        });
    }

    unfollowButtonCallback() {
        axios.get("api/api-profile.php?follow=false").then(response => {
            document.getElementById("unfollowButton").classList.add("d-none");
            document.getElementById("followButton").classList.remove("d-none");
        }).catch(error => {
            console.log("Error detected while unfollowing: " + error);
        });
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
            this.#followButton = document.createElement("button");
            this.#followButton.id = "followButton";
            this.#followButton.type = "button";
            this.#followButton.classList.add("btn");
            this.#followButton.textContent = "Follow";
            if(followStatus){
                this.#followButton.classList.add("d-none");
            }
        }
    }

    #generateUnfollowButton(isPersonalProfile, followStatus) {
        if (!isPersonalProfile) {
            this.#unfollowButton = document.createElement("button");
            this.#unfollowButton.id = "unfollowButton";
            this.#unfollowButton.type = "button";
            this.#unfollowButton.classList.add("btn");
            this.#unfollowButton.textContent = "Unfollow";
            if(!followStatus){
                this.#unfollowButton.classList.add("d-none");
            }
        }
    }
}

export { FollowButton }
