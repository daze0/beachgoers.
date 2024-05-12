import { NewPostPopup } from "../../../popups/view-layouts/newPostPopup.js";
import { Post } from "../../../feed/view-components/post/post.js";
import { LoadingElement } from "../../../feed/view-components/misc/loading.js";
import { Listener } from "../../../utils/listener.js";

class ProfileFeed {
    #layout;
    #components;
    #listeners;

    #nextPage;
    #hasMoreData;
    #isAlreadyLoading;

    constructor() {
        this.#components = {
            "newPostPopup": new NewPostPopup(),
            "loadingElement": new LoadingElement(),
            //post-ID dynamic components...
        };
        this.scrollPostsCallback = this.scrollPostsCallback.bind(this);
        this.#listeners = {
            "scrollPosts": new Listener("document", "scrollend", this.scrollPostsCallback)
        }
        this.#nextPage = 2;
        this.#hasMoreData = true;
        this.#isAlreadyLoading = false; // Lock-like variable to prevent problems with multiple scroll events
    }

    scrollPostsCallback() {
        console.log(`PROFILE FEED - PAGE REQ #${this.#nextPage - 1} - scroll detected`);
        if (this.#hasMoreData && !this.#isAlreadyLoading) {
            console.log(`PROFILE FEED - PAGE REQ #${this.#nextPage - 1} - lazy`);
            // Load more content
            this.loadMorePosts();
        }
    }

    loadMorePosts() {
        const postSectionLoadingElem = document.querySelector("#postSection > div > div.loading-dots");

        // Loading animation
        this.#components["loadingElement"].toggleComponent();
        this.#isAlreadyLoading = true;

        // Load more content
        axios.get(`api/api-profile-feed.php?page=${this.#nextPage++}`).then(response => {
            this.#components["loadingElement"].toggleComponent();
            if (response.data["posts"].length > 0) {
                const newPostsIds = response.data["posts"].map(post => `post-${post.postid}`);
                this.#layout.getUserFeedData()["posts"].push(response.data["posts"]);
                postSectionLoadingElem.insertAdjacentHTML("beforebegin", this.#generatePosts(response.data));
                // Attach new posts' listeners, or comments and likes won't work
                /*
                    REFACTORing NOTE: could be better to call #attachListeners and change 
                        each listener attaching method to support a isAttached method
                        in order to permit attaching listeners for components generated 
                        after first render.
                */
                Object.entries(this.#components)
                    .filter(([label, component]) => newPostsIds.includes(label))
                    .forEach(([label, component]) => {
                        console.log(label);
                        component.attachListeners();
                    });
            } else {
                this.#hasMoreData = false;
            }
            this.#isAlreadyLoading = false;
            // OPTIONAL: save nextPage in a cookie, this keeps memory of user's post scroll interaction
        }).catch(error => {
            console.error("Error while loading more posts: ", error);
        });
    }

    getComponent(label) {
        if (label in this.#components) {
            return this.#components[label];
        }
        throw new Error("Label not valid");
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
        Object.entries(this.#listeners).forEach(([label, listener]) => {
            listener.attachListener();
        });
    }

    #generateProfileFeed(userData, userFeedData) {
        return this.#generateNewPostBtnSection(userData) + this.#generatePosts(userFeedData);
    }

    #generateNewPostBtnSection(userData) {
        return `
        <div class="col py-4 text-center w-100">
            ${this.#components.newPostPopup.getPopupOpenElement().generateComponent(userData["personal_profile"])}
        </div>
        `;
    }

    #generatePosts(userFeedData) {
        let content = "";

        for (const postData of userFeedData.posts) {
            const postComponent = new Post();
            this.#components["post-" + postData.postid] = postComponent;
            content += postComponent.generateComponent(postData, userFeedData.username, userFeedData.userimg, this.#layout);
        }

        return content;
    }
}

export { ProfileFeed }