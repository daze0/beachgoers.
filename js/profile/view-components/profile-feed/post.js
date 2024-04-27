class Post {
    #components;

    constructor() {
        this.#components = {
            
        };
    }

    generateComponent(data, authorUsername) {
        const post = this.#generatePost(data, authorUsername);
        return post;
    }

    attachListeners() {
        Object.entries(this.#components).forEach(([label, component]) => {
            component.attachListeners();
        });
    }

    #generatePost(postData, authorUsername) {
        return `
        <div class="card mb-4" >
            <div class="card-header">
                ${authorUsername} - ${postData.createdAt}
            </div>
            <img class="card-img rounded-0" src="upload/${postData.img}" alt="post image"/>
            <div class="card-body">
                <p class="card-text">${postData.content}</p>
            </div>
            <div class="card-body">
                
            </div>
        </div>
        `;
    }
}

export { Post }