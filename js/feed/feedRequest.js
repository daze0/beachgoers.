import { FeedViewLayout } from './view-layouts/feedViewLayout.js';
import { LoadingElement } from './view-components/misc/loading.js';

class FeedRequest {
    #components;
    #layout;

    constructor() {
        this.#components = {
            "loadingElement": new LoadingElement()
        };
        this.#layout = undefined;
    }

    loadRequest() {
        axios.get("api/api-feed.php?page=1").then(response => {
            console.log("FEED - PAGE REQ #1 - main");
            this.#layout = new FeedViewLayout(this.#components, response.data);
            this.#layout.render(document.querySelector("main"));

            // Check if the document is already loaded
            if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", () => {
                    this.#handleLoadedDOM(this.#layout);
                });
            } else {
                this.#handleLoadedDOM(this.#layout);
            }
        })
    }

    #handleLoadedDOM(layout) {
        console.log("FEED - PRE OPTIONAL PAGE REQ #1.1 - dom loaded");
        const postSectionContainer = document.querySelector("#postSection > div");

        console.log("FEED - PRE OPTIONAL PAGE REQ #1.1 - clientHeight=", postSectionContainer.clientHeight);
        console.log("FEED - PRE OPTIONAL PAGE REQ #1.1 - innerHeight=", window.innerHeight);

        if (postSectionContainer.clientHeight <= window.innerHeight) {
            console.log("FEED - PRE OPTIONAL PAGE REQ #1.1 - edge case detected");
            layout.loadMorePosts();
        }
    }
}

export { FeedRequest };