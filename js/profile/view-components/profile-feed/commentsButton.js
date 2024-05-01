import { PopupOpenElement } from '../../../popups/view-components/popupOpenElement.js';

class CommentsButton extends PopupOpenElement {
    #postid;

    constructor(popup) {
        super(popup);
    }

    generateComponent(postid, commentsCount) { 
        this.#postid = postid;
        const button = this._generateReactiveButton("commentsButton-"+postid, "btn", "bi-chat");
        const badge = document.createElement('span');
        badge.id = "commentsButtonCountBadge-"+postid;
        badge.classList.add('badge','text-dark')
        badge.textContent = commentsCount;
        if(!commentsCount){
            badge.classList.add('d-none');
        }
        button.append(badge);
        return button.outerHTML;
    }

    updateCommentsCount(commentsCount){
        const badge = document.getElementById("commentsButtonCountBadge-"+this.#postid);
        badge.textContent = commentsCount;
        if(commentsCount){
            badge.classList.remove('d-none');
        }else{
            badge.classList.add('d-none');
        }
    }
}
export { CommentsButton }