import { FeedViewLayout } from './view-layouts/feedViewLayout.js';

class FeedRequest {
    #components;
    #layout;

    constructor() {
        this.#components = {};
        this.#layout = undefined;
    }

    loadRequest() {
        axios.get("api/api-feed.php").then(response => {
            this.#layout = new FeedViewLayout(this.#components, response.data);
            this.#layout.render(document.querySelector("main"));
        })
    }
}

export { FeedRequest };