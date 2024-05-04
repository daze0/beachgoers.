import { NewPostPopup } from "../../../popups/view-layouts/newPostPopup.js";
import { Post } from "./post.js";

class ProfileFeed {
    #layout;
    #components;

    constructor() {
        this.#components = {
            "newPostPopup": new NewPostPopup(),
            //post-ID dynamic components...
        };
    }

    generateComponent(userData, userFeedData, layout) {
        /*
         Layout has to be defined prior to generating the component.
         This is because the layout is used to determine the layout of the component,
         to which it can send updates without needing to send another request to refresh
         the page.       
        */
        this.#layout = layout;
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
        <div class="col p-4 text-center w-100">
            ${this.#components.newPostPopup.getPopupOpenElement().generateComponent(userData["personal_profile"])}
        </div>
        `;

        for (const postData of userFeedData.posts) {
            const postComponent = new Post();
            this.#components["post-" + postData.postid] = postComponent;
            content += postComponent.generateComponent(postData, userFeedData.username, userFeedData.userimg, this.#layout);
        }

        return content;
    }
}

export { ProfileFeed }