import { PopupOpenElement } from '../../../popups/view-components/popupOpenElement.js';

class NewPostButton extends PopupOpenElement {

    constructor(popup) {
        super(popup);
    }

    generateComponent(isPersonalProfile) { 
        if (isPersonalProfile) {
            return this._generateReactiveButton("newPostButton", "btn", "bi-plus-circle").outerHTML;
        }
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

    //newPostButtonCallback() {
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
    //}
}
export { NewPostButton }