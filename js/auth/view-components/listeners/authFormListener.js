class AuthFormListener {
    #form;
    #event;
    #callback;

    constructor(form, event, callback) {
        this.#form = form;
        this.#event = event;
        this.#callback = callback;
    }

    attachListener() {
        this.#form.addEventListener(this.#event, this.#callback);
    }

    detachListener() {
        this.#form.removeEventListener(this.#event, this.#callback);
    }
}

export { AuthFormListener };