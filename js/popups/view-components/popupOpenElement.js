/**
 * PopupOpenElement is a base class for all popup open elements.
 * It provides a method to generate the popup open element.
 * It also provides a method to get the listener.
 * @class PopupOpenElement
 */
class PopupOpenElement {
    #popup;
    #element;
    #listener;

    /*
     TODO: decide if it's better to handle popups within each respective trigger element 
            or via profile info(or profile feed in case of new post popup):
            - In the first case this class needs to be modified in order to create and store 
                internally the popup that the element the class represents triggers when you click it.
            - In the second case the popup class only needs to be extended with another method
                that allows post-creation data setup. 
                So basically there'd be a request, its response data is given to the popup that stores
                and displays it to the user.
    */
    constructor(popupId, popup) {
        this.#popup = popup;
        this.#element = undefined;
        this.#listener = new Listener(popupId, "click", this.#popupOpenCallback);
    }

    generateComponent() {
        throw new Error("method generate needs implementation");
    }

    getListener() {
        return this.#listener;
    }

    #popupOpenCallback() {
        this.#popup.togglePopupState(true);
        this.#popup.render();
    }
}

export { PopupOpenElement };