class FeedViewLayout {
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
        <a href="profile.php">PROFILE</a>`;

        return res;
    }
}

export { FeedViewLayout };