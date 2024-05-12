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

    loadRequest(firstLoad = true) {
        axios.get("api/api-profile.php?followers_list=true&following_list=true").then(response => {
            this.#profileInfoCallback(response.data, firstLoad);
        });
    }

    #profileFeedCallback(userData, userFeedData, firstLoad = true) {
        this.#layout = new ProfileViewLayout(this.#components, userData, userFeedData);
        this.#layout.render(document.querySelector("main"));

        // Check if the document is already loaded
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", () => {
                this.#handleLoadedDOM(this.#layout);
            });
        } else {
            this.#handleLoadedDOM(this.#layout);
        }

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

    #handleLoadedDOM(layout) {
        console.log("PROFILE FEED - PRE OPTIONAL PAGE REQ #1.1 - dom loaded");
        const postSectionContainer = document.querySelector("#postSection > div");

        console.log("PROFILE FEED - PRE OPTIONAL PAGE REQ #1.1 - clientHeight=", postSectionContainer.clientHeight);
        console.log("PROFILE FEED - PRE OPTIONAL PAGE REQ #1.1 - innerHeight=", window.innerHeight);

        if (postSectionContainer.clientHeight <= window.innerHeight) {
            console.log("PROFILE FEED - PRE OPTIONAL PAGE REQ #1.1 - edge case detected");
            layout.getComponent("profileFeed").loadMorePosts();
        }
    }

    #profileInfoCallback(userData, firstLoad = true) {
        axios.get("api/api-profile-feed.php?page=1").then(response => {
            if (firstLoad) {
                this.#profileFeedCallback(userData, response.data);
            } else {
                this.#profileFeedCallback(userData, response.data, firstLoad);
            }
        });
    }
}

export { ProfileRequest }