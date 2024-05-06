import { Listener } from "../../../utils/listener.js";

class NewCommentForm{
    #postid;
    #commentListPopup;

    constructor(postid, commentListPopup){
        this._form = document.createElement('form');
        this.#postid = postid;
        this.#commentListPopup = commentListPopup;
        this.formSubmitCallback = this.formSubmitCallback.bind(this);
        
        this._listeners = {
            "formSubmit": new Listener("#newCommentForm-"+this.#postid, "submit", this.formSubmitCallback)
        };
    }

    generateComponent(){
        const formContainer = document.createElement('div');
        formContainer.classList.add("w-100");
        this._form.action = "#";
        this._form.id = "newCommentForm-"+this.#postid;
        this._form.method = "post";
        this._form.classList.add("was-validate");
        const pError = document.createElement("p");
        pError.id = "newCommentFormError-"+this.#postid;
        pError.classList.add("text-danger");
        this._form.appendChild(pError);
        this._form.innerHTML += `${this.#generateNewCommentForm()}`;
        formContainer.innerHTML = this._form.outerHTML;

        return formContainer;
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

    formSubmitCallback(){
        this._form = document.querySelector("#newCommentForm-"+this.#postid);
        const data = new FormData(this._form);
        axios.post("api/api-comments.php", data).then(response => {
            if (response.data["comment_success"]) {
                this.#resetForm();
                this.#commentListPopup.updateCommentsList();
            } else {
                document.querySelector("#newCommentFormError-"+this.#postid).textContent = response.data["comment_error"];
            }
        });
    }

    #resetForm(){
        const form = document.getElementById("newCommentForm-"+this.#postid);
        form.reset();
    }

    #generateNewCommentForm(){
        let content = ``;
        content += this.#generatePostidInput();
        
        content += this.#generateCommentInputAndSubmitButton();

        return content;
    }

    #generatePostidInput(){
        return `
            <input type="hidden" name="pid" value="${this.#postid}"/>
        `;
    }

    #generateCommentInputAndSubmitButton(){
        return `
            <div class="input-group mt-2 mb-2 flex-nowrap">
                <label for="contentInput-${this.#postid}" class="form-label visually-hidden">Comment</label>
            
                <input id="commentInput-${this.#postid}" type="text" name="comment" class="form-control" placeholder="Write a new comment"/>
                <div class="input-group-append">
                    <input type="submit" class="btn btn primary" value="Pubblica">
                </div>
            </div>
        `;
    }
}
export {NewCommentForm};