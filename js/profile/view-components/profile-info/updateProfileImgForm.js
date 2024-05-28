import { Listener } from "../../../utils/listener.js";

class UpdateProfileImgForm {
    constructor() {
        this._form = document.createElement('form');
        this.formSubmitCallback = this.formSubmitCallback.bind(this);

        this._listeners = {
            "formSubmit": new Listener("#updateProfileImgForm", "submit", this.formSubmitCallback)
        };
    }

    generateComponent() {
        const formContainer = document.createElement('div');
        //formContainer.classList.add("col-md-7");
        this._form.action = "#";
        this._form.id = "updateProfileImgForm";
        this._form.method = "post";
        this._form.classList.add("was-validate");
        this._form.enctype = "multipart/form-data";
        this._form.accept = "image/*";
        const pError = document.createElement("p");
        pError.id = "updateProfileImgFormError";
        pError.classList.add("text-danger");
        this._form.innerHTML = `${this.#generateForm()}`;
        this._form.appendChild(pError);
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

    formSubmitCallback() {
        this._form = document.querySelector("#updateProfileImgForm");
        const data = new FormData(this._form);
        axios.post("api/api-profile.php", data).then(response => {
            if (response.data["profile_img_update_success"]) {
                document.location.reload();
            } else {
                document.querySelector("#updateProfileImgFormError").textContent = response.data["profile_img_update_error"];
            }
        });
    }

    #generateForm() {
        let content = ``;

        content += this.#generateImageUploadInput();

        content += this.#generateSubmitButton();

        return content;
    }

    #generateImageUploadInput() {
        return `
            <div class="input-group mt-2 mb-2 flex-nowrap">
                <label for="profileImgUploadInput" class="form-label visually-hidden">Image</label>
            
                <input type="file" id="profileImgUploadInput" name="profileimg" class="form-control rounded">
            </div>
        `;
    }

    #generateSubmitButton() {
        return `
            <div class="input-group">            
                <input type="submit" class="btn" value="Done">
            </div>
        `;
    }
}
export { UpdateProfileImgForm };