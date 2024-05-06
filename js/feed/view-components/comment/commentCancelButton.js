import { Listener } from '../../../utils/listener.js';

class CommentCancelButton{
    #commentid;
    #commentsList;
    #commentCancelButton;

    _listeners;

    constructor(commentData, commentsList) {
        this.#commentid= commentData.commentid;
        this.#commentsList = commentsList;    
        this._listeners = {
            "commentCancelButtonClick": new Listener("#commentCancelButton-"+this.#commentid, "click", this.clickCallback)
        };
    }

    generateComponent() {
        this.#commentCancelButton = document.createElement('button');
        this.#commentCancelButton.id = "commentCancelButton-"+this.#commentid;
        this.#commentCancelButton.type = 'button';
        this.#commentCancelButton.innerHTML = "<i class='bi bi-trash'></i>";
        this.#commentCancelButton.classList.add('btn','text-danger','float-end');
        return this.#commentCancelButton;
    }

    getListeners() {
        return this._listeners;
    }
    
    attachListeners() {
        const listeners = Object.values(this._listeners);
        listeners.forEach(listener => listener.attachListener());
    }

    detachListeners() {
        const listeners = Object.values(this._listeners);
        listeners.forEach(listener => listener.detachListener());
    }

    clickCallback = () => {
        axios.delete("api/api-comments.php", {
            params:{
                commentid: this.#commentid
            }
        }).then(response => {
            this.#commentsList.updateCommentsList();
        });
    }
}

export { CommentCancelButton };