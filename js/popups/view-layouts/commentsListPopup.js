import { CommentsButton } from '../../profile/view-components/profile-feed/commentsButton.js';
import { AbstractDataPopup } from '../popups.js';
import { PopupCancelButton } from '../view-components/popupCancelButton.js';
import { CommentsList } from '../../profile/view-components/profile-feed/commentsList.js';
import { NewCommentForm } from '../../profile/view-components/profile-feed/newCommentForm.js';


class CommentsListPopup extends AbstractDataPopup {
    constructor(data) {
        super(data);
        this._setComponent("popupCancelButton", new PopupCancelButton(this));
        this._setComponent("popupOpenElement", new CommentsButton(this));
        this._setComponent("commentsList", new CommentsList());
        this._setComponent("newCommentForm", new NewCommentForm(data.postid, this._getComponent('commentsList')));
    }

    _generate() {
        this._popup = document.createElement('div');
        this._popup.classList.add('modal', 'fade');
        this._popup.id = "commentsListPopup-"+this._data.postid;
        this._popup.tabIndex = -1;
        this._popup.setAttribute('aria-labelledby', 'commentsListPopupLabel-'+this._data.postid);
        this._popup.setAttribute('aria-hidden', 'true');

        const popupDialog = document.createElement('div');
        popupDialog.classList.add('modal-dialog', 'modal-dialog-scrollable', 'modal-dialog-centered');
        popupDialog.innerHTML = this.#generateCommentsPopupContent(this._data);

        this._popup.appendChild(popupDialog);
        this._popup.appendChild(this._getComponent("popupCancelButton").generateComponent());

        const alreadyPresentPopup = document.getElementById(this._popup.id);
        if (alreadyPresentPopup) {
            document.body.removeChild(alreadyPresentPopup);
        }
        document.body.appendChild(this._popup);
    }

    #generateCommentsPopupContent(data) {
        let content = '<div class="modal-content">';

        content += `
            <div class="modal-header px-4">
                <h2 id="commentsListPopupLabel-${data.postid}">Comments</h2>
                ${this._getComponent("popupCancelButton").generateComponent().outerHTML}
            </div>
        `;
        content += `
            <div class="modal-body p-4">
        `;

        content += this._getComponent('commentsList').generateComponent(data, this._getComponent('popupOpenElement'));

        content += `
            </div>
        `;

        content += `
            <div class="modal-footer">
        `;

        content += this._getComponent("newCommentForm").generateComponent().outerHTML;

        content += `
            </div>
        `;

        content += "</div>";

        return content;
    }


    _remove() {
        document.body.removeChild(this._popup);
    }
}

export { CommentsListPopup };