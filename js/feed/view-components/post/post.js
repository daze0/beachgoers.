import { CommentsListPopup } from "../../../popups/view-layouts/commentsListPopup.js";
import { Utils } from "../../../utils/utils.js";
import { PostCancelButton } from "./postCancelButton.js";
import { PostLikeButton } from "./postLikeButton.js";
import { ProfileViewLayout } from "../../../profile/view-layouts/profileViewLayout.js";

class Post {
    #components;

    constructor() {
        this.#components = {
            "postLikeButton": undefined,
            //"postCancelButton": undefined,
            "commentsListPopup": undefined
        };
    }

    generateComponent(data, authorUsername, authorImg, layout) {
        this.#components.postLikeButton = new PostLikeButton(data.postid, data.author, data.hasMyLike, layout);
        if (layout instanceof ProfileViewLayout) {
            this.#components.postCancelButton = new PostCancelButton(data);
        }
        this.#components.commentsListPopup = new CommentsListPopup(data);
        this.#components.commentsListPopup.render();
        const post = this.#generatePost(data, authorUsername, authorImg);
        return post;
    }

    attachListeners() {
        Object.entries(this.#components).forEach(([label, component]) => {
            component.attachListeners();
        });
    }

    #generateThumbnail(authorImg) {
        return `<img src="upload/${authorImg}" alt="Profile image" class="img-thumbnail rounded-circle" style="width:50px; height:50px"/>`;
    }

    #generateAuthorLink(authorId, authorUsername){
        const authorUrl = "profile.php?uid="+authorId;
        return `<a class="post-author-link" href="${authorUrl}">${authorUsername}</a>`;
    }

    #generatePost(postData, authorUsername, authorImg) {
        return `
        <div class="card mb-4" >
            <div class="card-header">
                ${this.#generateThumbnail(authorImg)}
                ${this.#generateAuthorLink(postData.author, authorUsername)}
                ${this.#generateCancelButton()}
                <span class="float-end pt-2">${Utils.generateTimeElapsedString(postData.createdAt)}</span>
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

    #generateCancelButton() {
        if (this.#components["postCancelButton"]) {
            return `<span class="float-end btn-sm mt-1 ms-2">${this.#components["postCancelButton"].generateComponent().outerHTML}</span>`;
        }
        return "";
    }
}

export { Post }