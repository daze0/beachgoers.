/**
 * AbstractPopup is a base class for popups.
 * @param {AbstractPopup} components
 */
class AbstractPopup {
    #components;
    #popupState;
    _popup;

    constructor() {
        this.#components = {
            "popupCancelButton": undefined,
            /*
             It is important to name the component below 
             'popupOpenElement' because the method
             getPopupOpenElement checks for this key.
            */
            "popupOpenElement": undefined
        };
        this.#popupState = false;
    }

    render() {
        this._generate();
    }

    /*
    These two methods below are standard for all view-layouts,
    in this case there's some particularity:
    - We want to call these methods from profileInfo in order
      to attach the listener to the component that opens the popup.
    - We also have more components inside the popup just as the popup
        open element, though they're considered of inner level so they will
        need to be attached/detached from within the popup. See _attachInnerListeners/_detachInnerListeners
    */
    attachListeners() {
        if (this.#components["popupOpenElement"].getListener() != undefined) {
            this.#components["popupOpenElement"].getListener().attachListener();
        }
    }

    detachListeners() {
        if (this.#components["popupOpenElement"].getListener() != undefined) {
            this.#components["popupOpenElement"].getListener().detachListener();
        }
    }

    _attachInnerListeners() {
        Object.entries(this.#components).filter(([label, component]) => label != "popupOpenElement" && label != "popupCancelButton")
            .forEach(([label, component]) => {
                component.getListener().attachListener();
            });
    }

    _detachInnerListeners() {
        Object.entries(this.#components).filter(([label, component]) => label != "popupOpenElement" && label != "popupCancelButton")
            .forEach(([label, component]) => {
                component.getListener().detachListener();
            });
    }

    togglePopupState(state) {
        this.#popupState = state;
    }

    getPopupOpenElement() {
        if ("popupOpenElement" in this.#components && this.#components["popupOpenElement"] != undefined) {
            return this.#components["popupOpenElement"];
        }
        return undefined;
    }

    _setComponent(label, component) {
        this.#components[label] = component;
    }

    _getComponent(label) {
        if (label in this.#components) {
            return this.#components[label];
        }
        return undefined;
    }

    getPopupId() {
        return this._popup.id;
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
    _data;

    constructor(data) {
        super();
        this._data = data;
    }

    setData(data) {
        if (data == undefined || data == null) {
            throw new Error("data is undefined");
        } else {
            this._data = data;
        }
    }
}

export { AbstractPopup, AbstractDataPopup };