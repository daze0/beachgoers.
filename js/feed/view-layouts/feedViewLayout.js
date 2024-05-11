import { Listener } from "../../utils/listener.js";
import { Post } from "../view-components/post/post.js";

class FeedViewLayout {
    #components;
    #listeners;
    #feedData;
    #nextPage;
    #hasMoreData;

    constructor(components, feedData) {
        this.#components = components;
        this.scrollPostsCallback = this.scrollPostsCallback.bind(this);
        this.#listeners = {
            "scrollPosts": new Listener("document", "scrollend", this.scrollPostsCallback)
        };
        this.#feedData = feedData;
        this.#nextPage = 2;
        this.#hasMoreData = true;
    }

    scrollPostsCallback() {
        console.log(`FEED - PAGE REQ #${this.#nextPage - 1} - scroll detected`);
        // Check if the user has scrolled to the bottom of the content container
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            console.log(`FEED - PAGE REQ #${this.#nextPage - 1} - lazy`);
            // Load more content
            this.loadMorePosts();
        }
    }

    loadMorePosts() {
        if (!this.#hasMoreData) {
            return;
        }

        const postSectionContainer = document.querySelector("#postSection > div");

        // OPTIONAL: loading animation

        // Load more content
        axios.get(`api/api-feed.php?page=${this.#nextPage++}`).then(response => {
            if (response.data["posts"].length > 0) {
                this.#feedData["posts"].push(response.data["posts"]);
                postSectionContainer.innerHTML += this.#generatePosts(response.data["posts"]);
            } else {
                this.#hasMoreData = false;
            }
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