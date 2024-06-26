import { Listener } from "../../utils/listener.js";

class AuthForm {
    constructor(title, formLabels) {
        this._title = title;
        this._form = document.createElement('form');
        this.formSubmitCallback = this.formSubmitCallback.bind(this);
        this._formLabels = formLabels;
        this._listeners = {
            "showHide": new Listener("#toggle", "click", this.#showHideCallback),
            "formSubmit": new Listener("form", "submit", this.formSubmitCallback)
        };
    }

    generateComponent(data = null) {
        const formContainer = document.createElement('section');
        this._form.action = "#";
        this._form.method = "post";
        this._form.classList.add("was-validate", "w-100");
        this._form.enctype = "multipart/form-data";
        this._form.accept = "image/*";
        const pError = document.createElement("p");
        pError.classList.add("custom-secondary-color");
        const strongPError = document.createElement("strong");
        pError.appendChild(strongPError);
        this._form.appendChild(pError);
        this._form.innerHTML += `${this.#generateAuthForm()}`;
        formContainer.innerHTML = `
        <header class="d-flex flex-row justify-content-center p-2">
            <h2 class="display-4 text-center">${this._title}</h2>
        </header>
        <div class="d-flex flex-row justify-content-center py-2 px-4 rounded-3 border">
            ${this._form.outerHTML}
        </div>
        <div class="d-flex flex-row justify-content-center p-2 mt-4 rounded-3 border">
            ${this._generateAuthQuestion()}
        </div>`;

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

    #generateAuthForm() {
        let res = "";
        for (const key of Object.keys(this._formLabels)) {
            res += this._generateFormElement(key, this._formLabels[key]);
        }
        res += `<div class="input-group mb-2">
        <input type="submit" class="btn w-100" value="${this._title}">
        </div>`;
        return res;
    }

    _generateAuthQuestion() {
        throw new Error("method generateAuthQuestion needs implementation");
    }

    _generateFormElement(label, textIconUrl) {
        throw new Error("method generateFormElement needs implementation");
    }

    _authenticate() {
        throw new Error("method authenticate needs implementation");
    }

    formSubmitCallback() {
        this._authenticate();
    }

    #showHideCallback() {
        const passwordInput = document.querySelector('.input-password');
        const toggle = document.getElementById('toggle');
        if (passwordInput.type === 'password') {
            passwordInput.setAttribute('type', 'text');
            toggle.innerHTML = '<span class="bi bi-eye-slash"></span>';
        } else {
            passwordInput.setAttribute('type', 'password');
            toggle.innerHTML = '<span class="bi bi-eye"></span>';
        }
    }
}

class LoginAuthForm extends AuthForm {
    constructor() {
        super(
            "Log-In",
            {
                "Username": "bi bi-person",
                "Password": "bi bi-key"
            }
        );
    }

    _generateAuthQuestion() {
        return `
        <p class="m-2 text-center">Don't have an account? <br/><a href="signup.php"><strong>Sign-up</strong></a></p>
        `;
    }

    _generateFormElement(label, classIcon) {
        let res = `
        <div class="input-group mt-2 mb-2 flex-nowrap">
            <label for="input${label}Login" class="form-label visually-hidden">${label}</label>
            <span class="input-group-text"><span class="${classIcon}"></span></span>
            `;
        if (label === "Password") {
            res += `
            <input type="password" id="input${label}Login" class="form-control input-password" placeholder="${label}" name="${label.toLowerCase()}"/>
            <button class="btn custom-btn-secondary" type="button" id="toggle">
                <span class="bi bi-eye"></span>
            </button>`;
        } else {
            res += `
            <input type="text" id="input${label}Login" class="form-control" placeholder="${label}" name="${label.toLowerCase()}"/>
            `;
        }
        res += `</div>`;

        return res;
    }

    _authenticate() {
        this._form = document.querySelector("form");
        const data = new FormData(this._form);
        console.log(data);
        axios.post("api/api-login.php", data).then(response => {
            if (response.data["login_success"]) {
                document.querySelector("main").innerHTML = this.generateLoginSuccessLayout(response.data["username"]);

                setTimeout(() => {
                    window.location.href = "feed.php";
                }, 500);
            } else {
                document.querySelector("form > p > strong").innerHTML = response.data["login_error"];
            }
        });
    }

    generateLoginSuccessLayout(username) {
        return `
        <div class="row">
            <div class="col-md-3"></div>
            <div class="auth-wrapper col-12 col-md-6 py-4">
                <header class="pb-3 mb-4 mt-4">
                    <h1 class="display-1 text-center"><a class="text-decoration-none pb-2 rounded-3" href="index.php">beachgoers.</a></h1>
                </header>
                <div class="p-5 custom-primary-color rounded-3">
                    <div class="container-fluid py-5 px-4">
                        <header class="d-flex flex-row justify-content-center p-2">
                            <h2 class="display-4 text-center">Welcome back</h2>
                        </header>
                        <div class="d-flex flex-row justify-content-center p-2">
                            <p class="fs-1 mb-0 text-center"><strong>${username}</strong>!</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3"></div>
        </div>
        `;
    }
}

class SignupAuthForm extends AuthForm {
    constructor() {
        super(
            "Sign-Up",
            {
                "Email": "bi bi-envelope",
                "Username": "bi bi-person",
                "Password": "bi bi-key",
                "Name": "",
                "Surname": "",
                "Profile picture": "bi bi-person-bounding-box",
                "Telegram username": ""
            }
        );
    }

    _generateAuthQuestion() {
        return `
        <p class="m-2 text-center">Already have an account? <a href="login.php"><strong>Log-in</strong></a></p>
        `;
    }

    _generateFormElement(label, classIcon) {

        const formKeys = Object.keys(this._formLabels);
        let trimmedLabel = label.replace(/\s/g, "");
        let res = "";

        if (label === formKeys[0] || label === formKeys[1] || label === formKeys[2]) {
            res = `
            <div class="input-group mt-2 mb-2 flex-nowrap">
                <label for="input${trimmedLabel}Signup" class="form-label visually-hidden">${label}</label>
                <span class="input-group-text"><span class="${classIcon}"></span></span>
                `;

            if (label === formKeys[2]) {
                res += `
                <input type="password" id="input${trimmedLabel}Signup" name="${trimmedLabel.toLowerCase()}" class="form-control input-password" placeholder="${label}" />
                    <button class="btn custom-btn-secondary" type="button" id="toggle">
                        <span class="bi bi-eye"></span>
                    </button>`;
            } else if (label === formKeys[1]) {
                res += `
                <input type="text" id="input${trimmedLabel}Signup" name="${trimmedLabel.toLowerCase()}" class="form-control" placeholder="${label}" />
                `;
            } else { //email
                res += `
                <input type="email" id="input${trimmedLabel}Signup" name="${trimmedLabel.toLowerCase()}" class="form-control" placeholder="${label}" />
                `;
            }
        } else {
            if (label === formKeys[5]) {
                res = `
                <div class="input-group custom-btn-file mt-2 mb-2 flex-nowrap">
                    <label for="input${trimmedLabel}Signup" class="form-label visually-hidden">${label}</label>
                    <span class="input-group-text">
                        <span class="${classIcon}"></span>
                    </span>
                `;
                res += `
                    <input type="file" id="input${trimmedLabel}Signup" name="${trimmedLabel.toLowerCase()}" class="form-control" />
                `;
            } else {
                res = `
                <div class="mt-2 mb-2 flex-nowrap">
                    <label for="input${trimmedLabel}Signup" class="form-label visually-hidden">${label}</label>
                `;
                res += `
                    <input type="text" id="input${trimmedLabel}Signup" name="${trimmedLabel.toLowerCase()}" class="form-control" placeholder="${label}" />
                `;
            }
        }

        res += `</div>`;

        return res;
    }

    _authenticate() {
        this._form = document.querySelector("form");
        const data = new FormData(this._form);
        console.log(data);
        axios.post("api/api-signup.php", data).then(response => {
            if (response.data["signup_success"]) {
                document.querySelector("main").innerHTML = this.generateSignupSuccessLayout(response.data["username"]);
                setTimeout(() => {
                    window.location.href = "profile.php";
                }, 500);
            } else {
                document.querySelector("form > p > strong").innerHTML = response.data["signup_error"];
                if (response.data["signup_error"] == "No profile picture provided") {
                    const profilePicInput = document.getElementById("inputProfilepictureSignup");
                    profilePicInput.classList.add("empty-required-input");
                    setTimeout(() => {
                        profilePicInput.classList.remove("empty-required-input");
                    }, 5000);
                } else {
                    const requiredInputs = [
                        document.getElementById("inputEmailSignup"),
                        document.getElementById("inputUsernameSignup"),
                        document.getElementById("inputPasswordSignup"),
                        document.getElementById("inputTelegramusernameSignup")
                    ];
                    for (const requiredInput of requiredInputs) {
                        if (requiredInput.value == "") {
                            requiredInput.classList.add("empty-required-input");
                            setTimeout(() => {
                                requiredInput.classList.remove("empty-required-input");
                            }, 5000);
                        }
                    }
                }
            }
        });
    }

    generateSignupSuccessLayout(username) {
        return `
        <div class="row">
            <div class="col-md-3"></div>
            <div class="auth-wrapper col-12 col-md-6 py-4">
                <header class="pb-3 mb-4 mt-4">
                    <h1 class="display-1 text-center"><a class="text-decoration-none pb-2 rounded-3" href="index.php">beachgoers.</a></h1>
                </header>
                <div class="p-5 custom-primary-color rounded-3">
                    <div class="container-fluid py-5 px-4">
                        <header class="d-flex flex-row justify-content-center p-2">
                            <h2 class="display-4 text-center">Welcome</h2>
                        </header>
                        <div class="d-flex flex-row justify-content-center p-2">
                            <p class="fs-1 mb-0 text-center"><strong>${username}</strong>!</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3"></div>
        </div>
        `;
    }
}

export { LoginAuthForm, SignupAuthForm };