class LoadingElement {
    #element;

    constructor() {
        this.#element = document.createElement("div");
        this.#element.classList.add("loading-dots", "my-5");
        this.#element.style.display = "none";
    }

    generateComponent() {
        const dotsNumber = 3;

        for (let i = 0; i < dotsNumber; i++) {
            const dot = document.createElement("span");
            this.#element.appendChild(dot);
        }

        return this.#element.outerHTML;
    }

    toggleComponent() {
        const element = document.querySelector("div.loading-dots");
        element.style.display = (element.style.display === "none") ? "flex" : "none";
    }

    attachListeners() {
        return;
    }
}

export { LoadingElement };