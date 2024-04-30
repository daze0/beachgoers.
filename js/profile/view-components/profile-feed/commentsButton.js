import { PopupOpenElement } from '../../../popups/view-components/popupOpenElement.js';

class CommentsButton extends PopupOpenElement {

    constructor(popup) {
        super(popup);
    }

    generateComponent(postid, commentsCount) { 
        const button = this._generateReactiveButton("commentsButton-"+postid, "btn", "bi-chat");
        if(commentsCount){
            const badge = document.createElement('span');
            badge.classList.add('badge','text-dark')
            badge.textContent = commentsCount;
            button.append(badge);
        }
        return button.outerHTML;
    }
}
export { CommentsButton }