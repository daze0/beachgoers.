class LogoutIconListener {
    #selector;
    #event;
    #listener;
    #callback;

    constructor(selector, event, callback) {
        this.#selector = selector;
        this.#event = event;
        this.#listener = undefined;
        this.#callback = callback;
    }

    attachListener() {
        this.#listener = e => {
            e.preventDefault();
            if (e.target.matches(this.#selector)) {
                this.#callback();
            }
        }
        document.querySelector(this.#selector).addEventListener(this.#event, this.#listener);
    }

    detachListener() {
        document.querySelector(this.#selector).removeEventListener(this.#event, this.#listener);
    }
}

export { LogoutIconListener };