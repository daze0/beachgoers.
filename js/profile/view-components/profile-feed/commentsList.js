import { Comment } from "./comment.js";

class CommentsList {
    #components;
    #commentsButton;
    #postData;

    constructor() {
        this.#components = {
            //comment-ID dynamic components...
        };
    }

    generateComponent(postData, commentsButton) {
        this.#postData = postData;
        this.#commentsButton = commentsButton;
        const content = this.#generateCommentsList(postData);
        return content;
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

    #generateCommentsList(postData) {
        let content = "";
        content += `
            <div id="commentsList-${postData.postid}">
        `;

        content += this.#generateCommentsListContent(postData.comments)

        content += `
            </div>
        `;

        return content;
    }

    #clearCommentsComponents(){
        this.detachListeners();
        this.#components = [];
    }

    #generateCommentsListContent(comments){
        if(comments.length == 0){
            return `
                <p>No comments yet</p>
            `;
        }
        let content = "";
        let isFirst = true;
        for (const comment of comments) {
            const commentComponent = new Comment();
            this.#components["comment-"+comment.commentid] = commentComponent;
            content += commentComponent.generateComponent(comment, this);
        }
        return content;
    }


    updateCommentsList(){
        axios.get("api/api-comments.php",{
            params:{
                pid: this.#postData.postid
            }
        }).then(response => {
            this.#clearCommentsComponents();
            const newCommentList = this.#generateCommentsListContent(response.data.comments);
            const commentListElement = document.getElementById('commentsList-'+this.#postData.postid);
            commentListElement.innerHTML = newCommentList;
            this.attachListeners();
            this.#commentsButton.updateCommentsCount(response.data.comments.length);
        });
    }
}

export { CommentsList }