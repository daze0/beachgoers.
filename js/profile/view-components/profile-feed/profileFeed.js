import { NewPostPopup } from "../../../popups/view-layouts/newPostPopup.js";
import { Post } from "./post.js";

class ProfileFeed {
    #components;

    constructor() {
        this.#components = {
            "newPostPopup": new NewPostPopup(),
            //post-ID dynamic components...
        };
    }

    generateComponent(userData, userFeedData) {
        //this.#components.newPostPopup = new NewPostPopup();
        this.#components.newPostPopup.render();
        const profileFeed = this.#generateProfileFeed(userData, userFeedData);
        return profileFeed;
    }

    attachListeners() {
        Object.entries(this.#components).forEach(([label, component]) => {
            component.attachListeners();
        });
    }

    #generateProfileFeed(userData, userFeedData) {
        let content = `
        <div class="col-3 p-4 text-center">
            ${this.#components.newPostPopup.getPopupOpenElement().generateComponent(userData["personal_profile"])}
        </div>
        `;

        for(const postData of userFeedData.posts){
            const postComponent = new Post();
            this.#components["post-"+postData.postid] = postComponent;
            content += postComponent.generateComponent(postData, userFeedData.username);
        }

        return content;
    }
}

export { ProfileFeed }