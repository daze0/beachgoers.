import { ProfileInfo } from './view-components/profile-info/profileInfo.js';
import { ProfileFeed } from './view-components/profile-feed/profileFeed.js';
import { ProfileViewLayout } from './view-layouts/profileViewLayout.js';

class ProfileRequest {
    #components;
    #layout;

    constructor() {
        this.#components = {
            "profileInfo": new ProfileInfo(),
            "profileFeed": new ProfileFeed()
        };
        this.#layout = undefined;
    }

    #profileFeedCallback(userData, userFeedData, firstLoad = true) {
        this.#layout = new ProfileViewLayout(this.#components, userData, userFeedData);
        this.#layout.render(document.querySelector("main"));
        if (firstLoad) {/*
            attachProfileInfoListeners(userData);
            attachProfileFeedListeners(userData, userFeedData);
        } else {
            detachProfileInfoListeners(userData);
            detachProfileFeedListeners(userData, userFeedData);
            attachProfileInfoListeners(userData);
            attachProfileFeedListeners(userData, userFeedData);*/
        }
    }

    #profileInfoCallback(userData, firstLoad = true) {
        axios.get("api/api-profile-feed.php").then(response => {
            if (firstLoad) {
                this.#profileFeedCallback(userData, response.data);
            } else {
                this.#profileFeedCallback(userData, response.data, firstLoad);
            }
        });
    }

    loadRequest(firstLoad = true) {
        axios.get("api/api-profile.php?followers_list=true&following_list=true").then(response => {
            this.#profileInfoCallback(response.data, firstLoad);
        });
    }
}

export { ProfileRequest }