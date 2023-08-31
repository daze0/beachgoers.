class ProfileViewLayout {
    #components;

    constructor(components) {
        this.#components = components;
    }

    render(rootElement) {
        rootElement.innerHTML = this.#generate();
        // TODO: attach listeners
    }

    #generate() {
        let res = `
        `;

        return res;
    }
}

export { ProfileViewLayout };