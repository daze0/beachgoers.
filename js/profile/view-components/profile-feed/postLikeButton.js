import { Listener } from '../../../utils/listener.js';

class PostLikeButton {
    #postLikeButton;
    #postRemoveLikeButton;

    #postid
    #userid
    #hasLiked

    _listeners;

    constructor(postid, userid, hasLiked) {
        this.#postLikeButton = undefined;
        this.#postRemoveLikeButton = undefined;
        this.#postid=postid;
        this.#userid=userid;
        this.#hasLiked=hasLiked;
        this._listeners = {
            "postLikeButtonClick": new Listener("#postLikeButton-"+postid, "click", this.postLikeButtonCallback),
            "postRemoveLikeButtonClick": new Listener("#postRemoveLikeButton-"+postid, "click", this.postLikeButtonCallback)
        };
    }

    generateComponent() {
        this.#generatePostLikeButton();
        this.#generatePostRemoveLikeButton();
        return this.#postLikeButton.outerHTML+this.#postRemoveLikeButton.outerHTML;
    }

    postLikeButtonCallback = () => { // If i directly declare the function "this" is the Listener object, using lambda this is the current PostLikeButton object
        axios.get("api/api-profile-feed.php?userid="+this.#userid+"&postid="+this.#postid).then(response => {
            console.log(response);
            if(response.data.like_success){
                document.getElementById("postLikeButton-"+this.#postid).classList.add("d-none");
                document.getElementById("postRemoveLikeButton-"+this.#postid).classList.remove("d-none");
            }else{
                document.getElementById("postLikeButton-"+this.#postid).classList.remove("d-none");
                document.getElementById("postRemoveLikeButton-"+this.#postid).classList.add("d-none");
            }
        }).catch(error => {
            console.log("Error detected while liking/unliking post: " + error);
        });
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
        this.#postLikeButton.id = "postLikeButton-"+this.#postid;
        this.#postLikeButton.type = "button";
        this.#postLikeButton.classList.add("btn");
        this.#postLikeButton.innerHTML = "<i class='bi bi-heart'></i>";
        if(this.#hasLiked){
            this.#postLikeButton.classList.add("d-none");
        }
    }

    #generatePostRemoveLikeButton() {
        this.#postRemoveLikeButton = document.createElement("button");
        this.#postRemoveLikeButton.id = "postRemoveLikeButton-"+this.#postid;
        this.#postRemoveLikeButton.type = "button";
        this.#postRemoveLikeButton.classList.add("btn");
        this.#postRemoveLikeButton.innerHTML = "<i class='bi bi-heart-fill'></i>";
        if(!this.#hasLiked){
            this.#postRemoveLikeButton.classList.add("d-none");
        }
    }
}
export { PostLikeButton }