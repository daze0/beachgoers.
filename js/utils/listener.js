class Listener {
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
        if (this.#selector === "document") {
            document.addEventListener(this.#event, this.#callback);
            return;
        }

        this.#listener = e => {
            e.preventDefault();
            console.log(e.currentTarget);
            if (e.currentTarget.matches(this.#selector)) {
                console.log("matched");
                this.#callback();
            }
        }
        console.log("selector: " + this.#selector);
        document.querySelector(this.#selector).addEventListener(this.#event, this.#listener);
    }

    detachListener() {
        if (this.#selector === "document") {
            document.removeEventListener(this.#event, this.#listener);
        }
        document.querySelector(this.#selector).removeEventListener(this.#event, this.#listener);
    }
}

export { Listener }