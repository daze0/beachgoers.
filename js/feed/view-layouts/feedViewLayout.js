import { Listener } from "../../utils/listener.js";
import { Post } from "../view-components/post/post.js";

class FeedViewLayout {
    #components;
    #listeners;
    #feedData;

    #nextPage;
    #hasMoreData;
    #isAlreadyLoading;

    constructor(components, feedData) {
        this.#components = components;
        this.scrollPostsCallback = this.scrollPostsCallback.bind(this);
        this.#listeners = {
            "scrollPosts": new Listener("document", "scrollend", this.scrollPostsCallback)
        };
        this.#feedData = feedData;
        this.#nextPage = 2;
        this.#hasMoreData = true;
        this.#isAlreadyLoading = false; // Lock-like variable to prevent problems with multiple scroll events
    }

    scrollPostsCallback() {
        console.log(`FEED - PAGE REQ #${this.#nextPage - 1} - scroll detected`);
        if (this.#hasMoreData && !this.#isAlreadyLoading) {
            console.log(`FEED - PAGE REQ #${this.#nextPage - 1} - lazy`);
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
        axios.get(`api/api-feed.php?page=${this.#nextPage++}`).then(response => {
            this.#components["loadingElement"].toggleComponent();
            if (response.data["posts"].length > 0) {
                const newPostsIds = response.data["posts"].map(post => `post-${post.postid}`);
                this.#feedData["posts"].push(response.data["posts"]);
                postSectionLoadingElem.insertAdjacentHTML("beforebegin", this.#generatePosts(response.data["posts"]));
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

    render(rootElement) {
        rootElement.innerHTML = this.#generate();
        this.#attachListeners();
    }

    #attachListeners() {
        Object.entries(this.#components).forEach(([label, component]) => {
            component.attachListeners();
        });
        Object.entries(this.#listeners).forEach(([label, listener]) => {
            listener.attachListener();
        });
    }

    #generate() {
        let content = `
        <div class="row bg-light pt-5 mb-5">
            <div id="spacingStartSection" class="col-3"></div>
            <div id="spacingCenterSection" class="d-none"></div>
            <div id="postSection" class="col-6 overflow-auto">
                <div class="bg-light">
                    ${this.#generatePosts(this.#feedData["posts"])}
                    ${this.#components["loadingElement"].generateComponent()}
                </div>
            </div>
            <div id="spacingEndSection" class="col-3 pe-0"></div>
        </div>`;

        return content;
    }

    #generatePosts(data) {
        let content = "";

        for (const postData of data) {
            const postComponent = new Post();
            this.#components["post-" + postData.postid] = postComponent;
            content += postComponent.generateComponent(postData, postData.username, postData.userimg);
        }

        return content;
    }
}

export { FeedViewLayout };