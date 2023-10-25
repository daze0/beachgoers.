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
            console.log(e.target);
            if (e.target.matches(this.#selector)) {
                console.log("matched");
                this.#callback();
            }
        }
        document.querySelector(this.#selector).addEventListener(this.#event, this.#listener);
        console.log("logout action attached");
    }

    detachListener() {
        document.querySelector(this.#selector).removeEventListener(this.#event, this.#listener);
    }
}

export { LogoutIconListener };