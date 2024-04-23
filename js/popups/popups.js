/**
 * AbstractPopup is a base class for popups.
 * @param {AbstractPopup} components
 */
class AbstractPopup {
    #components;
    #popupState;

    constructor(components) {
        this.#components = components;
        this.#popupState = false;
    }

    render() {
        // Could be helpful to check popup state before generating content.
        return this._generate();
    }

    togglePopupState(state) {
        this.#popupState = state;
    }

    _generate() {
        throw new Error("method generate needs implementation");
    }
}

/**
 * AbstractDataPopup is a base class for popups with data.
 * @param {AbstractPopup} components
 * @param {Object} data
 */
class AbstractDataPopup extends AbstractPopup {
    #data;

    constructor(components, data) {
        super(components);
        this.#data = data;
    }
}

export { AbstractPopup, AbstractDataPopup };