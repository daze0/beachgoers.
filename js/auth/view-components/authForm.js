class AuthForm {
    constructor(title, formLabels, listener) {
        this._title = title;
        this._form = document.createElement('form');
        this._formLabels = formLabels;
        this._listener = listener;
    }

    generateComponent(data) {
        return this._form; // or col-md-7 container
    }

    getListener() {
        return this._listener;
    }

    _generateAuthForm() {
        return ""; //TODO
    }

    _generateAuthQuestion() {
        return ""; //TODO
    }

    _generateFormElement(label, textIconUrl) {
        return ""; //TODO
    }

    _authenticate() {  // form param is useless since it's already a property
        //TODO
    }

    _formSubmitCallback() {
        //TODO
    }
}