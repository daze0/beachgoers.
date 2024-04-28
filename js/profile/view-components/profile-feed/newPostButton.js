import { Listener } from '../../../utils/listener.js';

class NewPostButton {
    #newPostButton;
    _listeners;

    constructor() {
        this.#newPostButton = undefined;
        this._listeners = {
            "newPostButtonClick": new Listener("#newPostButton", "click", this.newPostButtonCallback)
        };
    }

    generateComponent(isPersonalProfile) {
        this.#generateNewPostButton(isPersonalProfile);
        return (this.#newPostButton instanceof HTMLElement) ? this.#newPostButton.outerHTML : "";
        /*
        Leon's note(PART#2):
         Per intenderci verrebbe fuori una roba del genere:
            if (isPersonalProfile) {
                return this._generateReactiveButton("newPostButton", "w-100", "bi-circle").outerHTML;
            }
         Poi se vuoi modificare il button lavori direttamente 
         nel metodo this._generateReactiveButton della classe PopupOpenElement.
        */
    }

    newPostButtonCallback() {
        //TODO IMPLEMENT
        /*
        Leon's note(PART#1):
         - Ho creato un metodo in popupOpenElement che potrebbe 
            fare al caso tuo, modifica tranquillamente il codice a tuo piacimento, se necessario.
         - Inoltre ti consiglio, per semplificare il codice, di ereditare
            da PopupOpenElement così che hai da gestire solo generateComponent, tra l'altro
            così facendo si risolve pure il problema del querySelector che da null, perchè newPostButton 
            non è presente, quando si visita il profilo di un'altro utente.
        */
    }

    getListener(label) {
        return this._listeners[label];
    }

    attachListeners() {
        const listeners = Object.values(this._listeners);
        listeners.forEach(listener => listener.attachListener());
    }

    #generateNewPostButton(isPersonalProfile) {
        if (isPersonalProfile) {
            this.#newPostButton = document.createElement("button");
            this.#newPostButton.id = "newPostButton";
            this.#newPostButton.type = "button";
            this.#newPostButton.classList.add("btn");
            this.#newPostButton.innerHTML = "<i class='bi bi-plus-circle'></i>";
        }
    }
}
export { NewPostButton }