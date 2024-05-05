import { Listener } from '../../../utils/listener.js';

class PostLikeButton {
    #postLikeButton;
    #postRemoveLikeButton;

    #postid;
    #userid;
    #hasLiked;

    #layout;

    _listeners;

    constructor(postid, userid, hasLiked, layout) {
        this.#postLikeButton = undefined;
        this.#postRemoveLikeButton = undefined;
        this.#postid = postid;
        this.#userid = userid;
        this.#hasLiked = hasLiked;
        this.#layout = layout;
        this.postLikeButtonCallback = this.postLikeButtonCallback.bind(this);
        this._listeners = {
            "postLikeButtonClick": new Listener("#postLikeButton-" + postid, "click", this.postLikeButtonCallback),
            "postRemoveLikeButtonClick": new Listener("#postRemoveLikeButton-" + postid, "click", this.postLikeButtonCallback)
        };
    }

    getLayout() {
        return this.#layout;
    }

    generateComponent() {
        this.#generatePostLikeButton();
        this.#generatePostRemoveLikeButton();
        return this.#postLikeButton.outerHTML + this.#postRemoveLikeButton.outerHTML;
    }

    postLikeButtonCallback = () => { // remove the if condition and directly do a request to one merged endpoint
        if (this.getLayout() != undefined) {
            axios.get("api/api-profile-feed.php?postid=" + this.#postid).then(response => {
                // console.log(response);
                if (response.data.like_success) {
                    // Like
                    this.getLayout().renderUpdate("USER_INFO", "add_like", response.data);
                    document.getElementById("postLikeButton-" + this.#postid).classList.add("d-none");
                    document.getElementById("postRemoveLikeButton-" + this.#postid).classList.remove("d-none");
                } else {
                    // Dislike
                    this.getLayout().renderUpdate("USER_INFO", "remove_like", response.data);
                    document.getElementById("postLikeButton-" + this.#postid).classList.remove("d-none");
                    document.getElementById("postRemoveLikeButton-" + this.#postid).classList.add("d-none");
                }
            }).catch(error => {
                console.log("Error detected while liking/unliking post: " + error);
            });
        } else {
            axios.get("api/api-feed.php?postid=" + this.#postid).then(response => {
                // console.log(response);
                if (response.data.like_success) {
                    // Like
                    document.getElementById("postLikeButton-" + this.#postid).classList.add("d-none");
                    document.getElementById("postRemoveLikeButton-" + this.#postid).classList.remove("d-none");
                } else {
                    // Dislike
                    document.getElementById("postLikeButton-" + this.#postid).classList.remove("d-none");
                    document.getElementById("postRemoveLikeButton-" + this.#postid).classList.add("d-none");
                }
            }).catch(error => {
                console.log("Error detected while liking/unliking post: " + error);
            });
        }

    }

    getListener(label) {
        return this._listeners[label];
    }

    attachListeners() {
        const listeners = Object.values(this._listeners);
        listeners.forEach(listener => listener.attachListener());
    }

    #generatePostLikeButton() {
        this.#postLikeButton = document.createElement("button");
        this.#postLikeButton.id = "postLikeButton-" + this.#postid;
        this.#postLikeButton.type = "button";
        this.#postLikeButton.classList.add("btn");
        this.#postLikeButton.innerHTML = "<i class='bi bi-heart'></i>";
        if (this.#hasLiked) {
            this.#postLikeButton.classList.add("d-none");
        }
    }

    #generatePostRemoveLikeButton() {
        this.#postRemoveLikeButton = document.createElement("button");
        this.#postRemoveLikeButton.id = "postRemoveLikeButton-" + this.#postid;
        this.#postRemoveLikeButton.type = "button";
        this.#postRemoveLikeButton.classList.add("btn");
        this.#postRemoveLikeButton.innerHTML = "<i class='bi bi-heart-fill'></i>";
        if (!this.#hasLiked) {
            this.#postRemoveLikeButton.classList.add("d-none");
        }
    }
}
export { PostLikeButton }