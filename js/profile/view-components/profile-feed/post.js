class Post {
    #components;

    constructor() {
        this.#components = {
            
        };
    }

    generateComponent(data) {
        const post = this.#generatePost(data);
        return post;
    }

    attachListeners() {
        Object.entries(this.#components).forEach(([label, component]) => {
            component.attachListeners();
        });
    }

    #generatePost(postData) {
        return `
        <div>
            ${postData.postid}
        </div>
        `;
    }
}

export { Post }