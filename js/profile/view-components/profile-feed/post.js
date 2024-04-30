import { PostLikeButton } from "./postLikeButton.js";

class Post {
    #components;

    constructor() {
        this.#components = {
            "postLikeButton": undefined
        };
    }

    generateComponent(data, authorUsername, authorImg) {
        this.#components.postLikeButton= new PostLikeButton(data.postid, data.author, data.hasMyLike);
        const post = this.#generatePost(data, authorUsername, authorImg);
        return post;
    }

    attachListeners() {
        Object.entries(this.#components).forEach(([label, component]) => {
            component.attachListeners();
        });
    }

    #generateThumbnail(authorImg){
        return `<img src="upload/${authorImg}" alt="Profile image" class="img-thumbnail rounded-circle" style="width:50px; height:50px"/>`;
    }

    #generateTimeElapsedString(createdAt){
        const actualDate = new Date();
        const createdAtDate = new Date(createdAt);
        const elapsedMs = actualDate - createdAtDate;
        const elapsedDays =  Math.floor(elapsedMs / 86_400_000);
        if(elapsedDays){
            return elapsedDays+" g";
        }
        const elapsedHours = Math.floor(elapsedMs / 3_600_000);
        if(elapsedHours){
            return elapsedHours+" h";
        }
        const elapsedMinutes = Math.floor(elapsedMs / 60_000);
        if(elapsedMinutes){
            return elapsedMinutes+" m";
        }
        const elapsedSeconds = Math.floor(elapsedMs / 1_000);
        if(elapsedSeconds){
            return elapsedSeconds+" s";
        }
        return "";
    }

    #generatePost(postData, authorUsername, authorImg) {
        return `
        <div class="card mb-4" >
            <div class="card-header">
                ${this.#generateThumbnail(authorImg)}
                ${authorUsername}
                <span class="text-muted float-end pt-2">${this.#generateTimeElapsedString(postData.createdAt)}</span>
            </div>
            <img class="card-img rounded-0" src="upload/${postData.img}" alt="post image"/>
            <div class="card-body">
                <p class="card-text">${postData.content}</p>
            </div>
            <div class="card-body">
                ${this.#components["postLikeButton"].generateComponent()}
            </div>
        </div>
        `;
    }
}

export { Post }