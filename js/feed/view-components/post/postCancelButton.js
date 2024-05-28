import { Listener } from '../../../utils/listener.js';

class PostCancelButton{
    #postid;
    #postCancelButton;

    _listeners;

    constructor(postData) {
        this.#postid= postData.postid;
        this._listeners = {
            "postCancelButtonClick": new Listener("#postCancelButton-"+this.#postid, "click", this.clickCallback)
        };
    }

    generateComponent() {
        this.#postCancelButton = document.createElement('button');
        this.#postCancelButton.id = "postCancelButton-"+this.#postid;
        this.#postCancelButton.type = 'button';
        this.#postCancelButton.innerHTML = "<span class='bi bi-trash'></span>";
        this.#postCancelButton.classList.add('btn','text-danger');
        return this.#postCancelButton;
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
        if(confirm("Confermi di voler eliminare il post selezionato?")){
            axios.delete("api/api-profile-feed.php", {
                params:{
                    postid: this.#postid
                }
            }).then(response => {
                location.reload();
            });
        }
    }
}

export { PostCancelButton };