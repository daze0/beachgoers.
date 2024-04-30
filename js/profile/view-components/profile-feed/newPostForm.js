import { Listener } from "../../../utils/listener.js";

class NewPostForm{
    constructor(){
        this._form = document.createElement('form');
        this.formSubmitCallback = this.formSubmitCallback.bind(this);
        
        this._listeners = {
            "formSubmit": new Listener("#newPostForm", "submit", this.formSubmitCallback)
        };
    }

    generateComponent(){
        const formContainer = document.createElement('div');
        formContainer.classList.add("col-md-7");
        this._form.action = "#";
        this._form.id = "newPostForm";
        this._form.method = "post";
        this._form.classList.add("was-validate");
        this._form.enctype = "multipart/form-data";
        this._form.accept = "image/*";
        const pError = document.createElement("p");
        pError.id = "newPostFormError";
        pError.classList.add("text-danger");
        this._form.appendChild(pError);
        this._form.innerHTML += `${this.#generateNewPostForm()}`;
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
        this._form = document.querySelector("#newPostForm");
        const data = new FormData(this._form);
        axios.post("api/api-profile-feed.php", data).then(response => {
            if (response.data["post_success"]) {
                document.location.reload();
            } else {
                document.querySelector("#newPostFormError").textContent = response.data["post_error"];
            }
        });
    }

    #generateNewPostForm(){
        let content = ``;

        content += this.#generateContentInput();

        content += this.#generateImageUploadInput();

        content += this.#generateSubmitButton();

        return content;
    }

    #generateContentInput(){
        return `
            <div class="input-group mt-2 mb-2 flex-nowrap">
                <label for="contentInput" class="form-label visually-hidden">Content</label>
            
                <textarea id="contentInput" name="content" class="form-control" placeholder="Inserisci contenuto"></textarea>
            </div>
        `;
    }

    #generateImageUploadInput(){
        return `
            <div class="input-group mt-2 mb-2 flex-nowrap">
                <label for="imageUploadInput" class="form-label visually-hidden">Image</label>
            
                <input type="file" id="imageUploadInput" name="postimg" class="form-control" placeholder="Image">
            </div>
        `;
    }

    #generateSubmitButton(){
        return `
            <div class="input-group">            
                <input type="submit" class="btn btn primary" value="Pubblica">
            </div>
        `;
    }
}
export {NewPostForm};