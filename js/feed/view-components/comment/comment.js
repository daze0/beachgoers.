import { Utils } from "../../../utils/utils.js";
import { CommentCancelButton } from "./commentCancelButton.js";
import { CommentLikeButton } from "./commentLikeButton.js";

class Comment {
    #components;

    constructor() {
        this.#components = {
            "commentLikeButton": undefined,
            //"commentCancelButton": undefined, //The component exists only if user can delete this comment
        };
    }

    generateComponent(commentData, commentsList) {
        if(commentData.canDelete){
            this.#components.commentCancelButton= new CommentCancelButton(commentData, commentsList);
        }
        this.#components.commentLikeButton = new CommentLikeButton(
            commentData.commentid,
            commentData.hasMyLike
        );
        const comment = this.#generateComment(commentData);
        return comment;
    }

    attachListeners() {
        Object.entries(this.#components).forEach(([label, component]) => {
            component.attachListeners();
        });
    }

    detachListeners() {
        Object.entries(this.#components).forEach(([label, component]) => {
            component.detachListeners();
        });
    }

    #generateCommentCancelButton(){
        if(this.#components.commentCancelButton){
            return this.#components.commentCancelButton.generateComponent().outerHTML;
        }
        return "";
    }

    #generateComment(comment) {
        return `
            <div>
                <img src="upload/${comment.userimg}" alt="Profile image" class="img-thumbnail rounded-circle" style="width:50px; height:50px"/>
                <span class="">${comment.username}</span>
                <span class="float-end pt-2"> 
                    ${this.#generateCommentCancelButton()}
                    ${this.#components.commentLikeButton.generateComponent()}
                </span>
            </div>
            <div>
                <span class="text-muted float-end">${Utils.generateTimeElapsedString(comment.createdAt)}</span>

                <p class="pt-2 ps-2">${comment.comment}</p>

               
            </div>
        `;
    }
}

export { Comment }