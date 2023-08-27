class AuthFormListener {
    #event;
    #listener;
    #callback;

    constructor(event, callback) {
        this.#event = event;
        this.#listener = undefined;
        this.#callback = callback;
    }

    attachListener() {
        console.log(this.#event + ";" + this.#callback);
        this.#listener = e => {
            e.preventDefault();
            if (e.target.matches("form")) {
                this.#callback();
            }
        }
        document.querySelector("form").addEventListener(this.#event, this.#listener);
    }

    detachListener() {
        console.log("detached");
        document.querySelector("form").removeEventListener(this.#event, this.#listener);
    }
}

export { AuthFormListener };