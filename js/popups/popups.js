/**
 * AbstractPopup is a base class for popups.
 * @param {AbstractPopup} components
 */
class AbstractPopup {
    #components;
    #popupState;
    _popup;

    constructor(components) {
        this.#components = components;
        this.#popupState = false;
    }

    render() {
        if (this.#popupState) {
            this._generate();
        } else {
            this._remove();
        }
    }

    togglePopupState(state) {
        this.#popupState = state;
    }

    _generate() {
        throw new Error("method generate needs implementation");
    }

    _remove() {
        throw new Error("method remove needs implementation");
    }
}

/**
 * AbstractDataPopup is a base class for popups with data.
 * @param {AbstractPopup} components
 * @param {Object} data
 */
class AbstractDataPopup extends AbstractPopup {
    #data;

    constructor(components, data = undefined) {
        super(components);
        this.#data = data;
    }

    setData(data) {
        if (data == undefined || data == null) {
            throw new Error("data is undefined");
        } else {
            this.#data = data;
        }
    }
}

export { AbstractPopup, AbstractDataPopup };