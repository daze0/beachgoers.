import { CommentsListPopup } from "../../../popups/view-layouts/commentsListPopup.js";
import { Utils } from "../../../utils/utils.js";
import { PostLikeButton } from "./postLikeButton.js";

class Post {
    #components;

    constructor() {
        this.#components = {
            "postLikeButton": undefined,
            "commentsListPopup": undefined
        };
    }

    generateComponent(data, authorUsername, authorImg) {
        this.#components.postLikeButton= new PostLikeButton(data.postid, data.author, data.hasMyLike);
        this.#components.commentsListPopup= new CommentsListPopup(data);
        this.#components.commentsListPopup.render();
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

    #generatePost(postData, authorUsername, authorImg) {
        return `
        <div class="card mb-4" >
            <div class="card-header">
                ${this.#generateThumbnail(authorImg)}
                ${authorUsername}
                <span class="text-muted float-end pt-2">${Utils.generateTimeElapsedString(postData.createdAt)}</span>
            </div>
            <img class="card-img rounded-0" src="upload/${postData.img}" alt="post image"/>
            <div class="card-body">
                <p class="card-text">${postData.content}</p>
            </div>
            <div class="card-body">
                ${this.#components["postLikeButton"].generateComponent()}
                ${this.#components["commentsListPopup"].getPopupOpenElement().generateComponent(postData.postid, postData.comments.length)}
            </div>
        </div>
        `;
    }
}

export { Post }