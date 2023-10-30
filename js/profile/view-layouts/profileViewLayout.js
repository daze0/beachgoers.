class ProfileViewLayout {
    #components;
    #userData;
    #userFeedData;

    constructor(components, userData, userFeedData) {
        this.#components = components;
        this.#userData = userData;
        this.#userFeedData = userFeedData;
    }

    render(rootElement) {
        rootElement.innerHTML = this.#generate();
        Object.entries(this.#components).forEach(([label, component]) => {
            component.attachListeners();
        });
    }

    #generate() {
        let res = `
        <div class="row bg-light">
            ${this.#components["profileInfo"].generateComponent(this.#userData)}
        </div>
        <div class="row bg-light pt-5 mb-5">
            <div id="spacingStartSection" class="col-3"></div>
            <div id="commentSection" class="d-none"></div>
            <div id="spacingCenterSection" class="d-none"></div>
            <div id="postSection" class="col-6 overflow-auto">
                <div class="row bg-light">
                    ${this.#components["profileFeed"].generateComponent(this.#userData, this.#userFeedData)}
                </div>
            </div>
            <div id="spacingEndSection" class="col-3 pe-0"></div>
        </div>
        `;

        return res;
    }
}

export { ProfileViewLayout };