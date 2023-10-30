class ProfileFeed {
    #components;

    constructor() {
        this.#components = {}; //TODO: define components
    }

    generateComponent(userData, userFeedData) {
        const profileFeed = this.#generateProfileFeed(userData, userFeedData);
        return profileFeed;
    }

    attachListeners() {
        Object.entries(this.#components).forEach(([label, component]) => {
            component.attachListeners();
        });
    }

    #generateProfileFeed(userData, userFeedData) {
        return undefined;
    }



}

export { ProfileFeed }