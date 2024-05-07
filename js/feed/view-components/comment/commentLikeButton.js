import { Listener } from '../../../utils/listener.js';

class CommentLikeButton {
    #commentLikeButton;
    #commentRemoveLikeButton;

    #commentid;
    //#userid;
    #hasLiked;

    //#layout;

    _listeners;

    constructor(commentid, hasLiked) {
        this.#commentLikeButton = undefined;
        this.#commentRemoveLikeButton = undefined;
        this.#commentid = commentid;
        //this.#userid = userid;
        this.#hasLiked = hasLiked;
        //this.#layout = layout;
        this.commentLikeButtonCallback = this.commentLikeButtonCallback.bind(this);
        this._listeners = {
            "commentLikeButtonClick": new Listener("#commentLikeButton-" + commentid, "click", this.commentLikeButtonCallback),
            "commentRemoveLikeButtonClick": new Listener("#commentRemoveLikeButton-" + commentid, "click", this.commentRemoveLikeButtonCallback)
        };
    }

    //getLayout() {
    //    return this.#layout;
    //}

    generateComponent() {
        this.#generateCommentLikeButton();
        this.#generateCommentRemoveLikeButton();
        return this.#commentLikeButton.outerHTML + this.#commentRemoveLikeButton.outerHTML;
    }

    commentLikeButtonCallback = () => {
        axios.post("api/api-comments.php",{
            commentid:this.#commentid,
            addLike:true
        },{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            // console.log(response);
            if (response.data.comment_add_like_success) {
                // Like
                //if (this.getLayout() != undefined) {
                //    this.getLayout().renderUpdate("USER_INFO", "add_comment_like", response.data);
                //}
                document.getElementById("commentLikeButton-" + this.#commentid).classList.add("d-none");
                document.getElementById("commentRemoveLikeButton-" + this.#commentid).classList.remove("d-none");
            }
        }).catch(error => {
            console.log("Error detected while liking comment: " + error);
        });
    }

    commentRemoveLikeButtonCallback = () => { 
        axios.post("api/api-comments.php",{
            commentid:this.#commentid,
            removeLike:true
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            // console.log(response);
            if (response.data.comment_remove_like_success) {
                // Dislike
                //if (this.getLayout() != undefined) {
                //    this.getLayout().renderUpdate("USER_INFO", "remove_like", response.data);
                //}
                document.getElementById("commentLikeButton-" + this.#commentid).classList.remove("d-none");
                document.getElementById("commentRemoveLikeButton-" + this.#commentid).classList.add("d-none");
            }
        }).catch(error => {
            console.log("Error detected while unliking comment: " + error);
        });
    }

    getListener(label) {
        return this._listeners[label];
    }

    attachListeners() {
        const listeners = Object.values(this._listeners);
        listeners.forEach(listener => listener.attachListener());
    }

    detachListeners() {
        const listeners = Object.values(this._listeners);
        listeners.forEach(listener => listener.detachListener());
    }

    #generateCommentLikeButton() {
        this.#commentLikeButton = document.createElement("button");
        this.#commentLikeButton.id = "commentLikeButton-" + this.#commentid;
        this.#commentLikeButton.type = "button";
        this.#commentLikeButton.classList.add("btn");
        this.#commentLikeButton.innerHTML = "<i class='bi bi-heart'></i>";
        if (this.#hasLiked) {
            this.#commentLikeButton.classList.add("d-none");
        }
    }

    #generateCommentRemoveLikeButton() {
        this.#commentRemoveLikeButton = document.createElement("button");
        this.#commentRemoveLikeButton.id = "commentRemoveLikeButton-" + this.#commentid;
        this.#commentRemoveLikeButton.type = "button";
        this.#commentRemoveLikeButton.classList.add("btn");
        this.#commentRemoveLikeButton.innerHTML = "<i class='bi bi-heart-fill'></i>";
        if (!this.#hasLiked) {
            this.#commentRemoveLikeButton.classList.add("d-none");
        }
    }
}
export { CommentLikeButton }