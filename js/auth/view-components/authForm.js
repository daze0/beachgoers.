import { AuthFormListener } from "./listeners/authFormListener.js";

class AuthForm {
    constructor(title, formLabels) {
        this._title = title;
        this._form = document.createElement('form');
        this._formLabels = formLabels;
        this._listener = new AuthFormListener(this._form, "submit", this.#formSubmitCallback);
    }

    generateComponent(data=null) {
        const formContainer = document.createElement('div');
        formContainer.classList.add("col-md-7");
        formContainer.innerHTML = `
        <header class="row p-2">
            <h2 class="display-4 text-center">${this._title}</h2>
        </header>
        <div class="row p-2 rounded-3 border border-dark shadow">
            <form action="#" method="post" class="was-validate" enctype="multipart/form-data" accept="image/*">
                <p></p>
                ${this.#generateAuthForm()}
            </form>
        </div>
        <div class="row p-2 mt-4 rounded-3 border border-dark shadow">
            ${this._generateAuthQuestion()}
        </div>`;

        return formContainer;
    }

    getListener() {
        return this._listener;
    }

    #generateAuthForm() {
        let res = "";
        for (const key of Object.keys(this._formLabels)) {
            res += this.#generateFormElement(key, this._formLabels[key]);
        }
        res += `<div class="input-group">
        <input type="submit" class="btn btn-primary" value="${this._title}">
        </div>`;
        return res;
    }

    _generateAuthQuestion() {
        throw new Error("method generateAuthQuestion needs implementation");
    }

    #generateFormElement(label, textIconUrl) {
        let res = `
        <div class="input-group mt-2 mb-2 flex-nowrap">
            <label for="input${label}Login" class="form-label visually-hidden">${label}</label>
            <span class="input-group-text"><img src="${textIconUrl}" alt="${label.toLowerCase()} icon" /></span>
            <input type="${label.toLowerCase()}" id="input${label}Login" class="form-control" placeholder="${label}" />
            `
        if (label === "Password") {
            res+= `<button class="btn btn-outline-secondary" type="button" id="toggle" onclick="showHide();">
                &#128065;
            </button>`;
        }
        res += `</div>`;

        return res;
    }

    _authenticate() {  // form param is useless since it's already a property
        throw new Error("method authenticate needs implementation");
    }

    #formSubmitCallback(event) {
        event.preventDefault();
        this._authenticate();
    }
}

class LoginAuthForm extends AuthForm {
    constructor() {
        super(
            "Log-In", 
            {
                "Username": "upload/user.png",
                "Password": "upload/padlock.png"
            }
        );
    }

    _generateAuthQuestion() {
        return `
        <p class="m-2 text-center align-middle">Don't have an account? <a href="signup.php">Sign-up</a></p>
        `;
    }

    _authenticate() {  
        const data = new FormData(this._form);
        axios.post("api/api-login.php", data).then(response => {
            if (response.data["login_success"]) {
                renderLayout(this.#generateLoginSuccessLayout(response.data["username"]));  //FIX: adapt method because renderLayout is from v1
            } else {
                document.querySelector("div.row.p-2 > form > p").innerHTML = response.data["login_error"];
            }
        });
    }

    #generateLoginSuccessLayout(username) {
        return `
        <div class="col-2"></div>
        <div class="container col-8 py-4">
            <header class="pb-3 mb-4 mt-4">
                <h1 class="display-1 text-center"><a class="text-decoration-none text-dark" href="feed.php">< ConnectU ></a></h1>
            </header>
            <div class="container-fluid py-5">
                <header class="row p-2">
                    <h2 class="display-4 text-center">Welcome back</h2>
                </header>
                <div class="row p-2">
                    <p class="text-center">${username}</p>
                </div>
            </div>
        </div>
        <div class="col-2"></div>`;
    }
}

class SignupAuthForm extends AuthForm {
    constructor() {
        super(
            "Sign-Up", 
            {
                "Email": "upload/mail.png",
                "Username": "upload/user.png",
                "Password": "upload/padlock.png",
                "Name": "",
                "Surname": "",
                "Profile Picture": ""
            }
        );
    }

    _generateAuthQuestion() {
        return `
        <p class="m-2 text-center align-middle">Already have an account? <a href="login.php">Log-in</a></p>
        `;
    }

    _authenticate() {  
        const data = new FormData(this._form);
        axios.post("api/api-signup.php", data).then(response => {
            if (response.data["signup_success"]) {
                renderLayout(this.#generateSignupSuccessLayout(response.data["username"]));
            } else {
                document.querySelector("div.row.p-2 > form > p").innerHTML = response.data["signup_error"];
            }
        });
    }

    #generateSignupSuccessLayout(username) {
        return `
        <div class="col-2"></div>
        <div class="container col-8 py-4">
            <header class="pb-3 mb-4 mt-4">
                <h1 class="display-1 text-center"><a class="text-decoration-none text-dark" href="feed.php">< ConnectU ></a></h1>
            </header>
            <div class="container-fluid py-5">
                <header class="row p-2">
                    <h2 class="display-4 text-center">Welcome</h2>
                </header>
                <div class="row p-2">
                    <p class="text-center">${username}</p>
                </div>
            </div>
        </div>
        <div class="col-2"></div>`;
    }
}

export { LoginAuthForm, SignupAuthForm };