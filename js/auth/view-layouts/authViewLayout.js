class AuthViewLayout {
    constructor(components) {
        this._components = components;
    }

    render(rootElement) {
        rootElement.innerHTML = this._generate();
    }

    _generate() {
        //TODO
    }
}