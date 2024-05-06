import { Post } from "../view-components/post/post.js";

class FeedViewLayout {
    #components;
    #feedData;

    constructor(components, feedData) {
        this.#components = components;
        this.#feedData = feedData;
    }

    render(rootElement) {
        rootElement.innerHTML = this.#generate();
        this.#attachListeners();
    }

    #attachListeners() {
        Object.entries(this.#components).forEach(([label, component]) => {
            component.attachListeners();
        });
    }

    #generate() {
        let content = `
        <div class="row bg-light pt-5 mb-5">
            <div id="spacingStartSection" class="col-3"></div>
            <div id="spacingCenterSection" class="d-none"></div>
            <div id="postSection" class="col-6 overflow-auto">
                <div class="bg-light">
        `;

        for (const postData of this.#feedData.posts) {
            const postComponent = new Post();
            this.#components["post-" + postData.postid] = postComponent;
            content += postComponent.generateComponent(postData, postData.username, postData.userimg);
        }

        content += `
                </div>
            </div>
            <div id="spacingEndSection" class="col-3 pe-0"></div>
        </div>`;

        return content;
    }
}

export { FeedViewLayout };