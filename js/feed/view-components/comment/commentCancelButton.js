import { Listener } from '../../../utils/listener.js';

class CommentCancelButton {
    #commentid;
    #commentsList;
    #commentCancelButton;

    _listeners;

    constructor(commentData, commentsList) {
        this.#commentid = commentData.commentid;
        this.#commentsList = commentsList;
        this._listeners = {
            "commentCancelButtonClick": new Listener("#commentCancelButton-" + this.#commentid, "click", this.clickCallback)
        };
    }

    generateComponent() {
        this.#commentCancelButton = document.createElement('button');
        this.#commentCancelButton.id = "commentCancelButton-" + this.#commentid;
        this.#commentCancelButton.type = 'button';
        this.#commentCancelButton.innerHTML = "<span class='bi bi-trash'></span>";
        this.#commentCancelButton.classList.add('btn');
        this.#commentCancelButton.title = "Delete comment";
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
        if (confirm("Confermi di voler eliminare il commento selezionato?")) {
            axios.delete("api/api-comments.php", {
                params: {
                    commentid: this.#commentid
                }
            }).then(response => {
                this.#commentsList.updateCommentsList();
            });
        }
    }
}

export { CommentCancelButton };