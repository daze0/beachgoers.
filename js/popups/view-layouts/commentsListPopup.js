import { CommentsButton } from '../../profile/view-components/profile-feed/commentsButton.js';
import { NewCommentForm } from '../../profile/view-components/profile-feed/newCommentForm.js';
import { Utils } from '../../utils/utils.js';
import { AbstractDataPopup } from '../popups.js';
import { PopupCancelButton } from '../view-components/popupCancelButton.js';

class CommentsListPopup extends AbstractDataPopup {
    constructor(data) {
        super(data);
        this._setComponent("popupCancelButton", new PopupCancelButton(this));
        this._setComponent("popupOpenElement", new CommentsButton(this));
        this._setComponent("newCommentForm", new NewCommentForm(data.postid, this));
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

        content += `
            <div id="commentsList-${this._data.postid}">
        `;
        content += this.#generateCommentsList(data.comments);
        content += `
            </div>
        `;

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

    #generateCommentsList(comments){
        if(comments.length == 0){
            return `
                <p>No comments yet</p>
            `;
        }
        let content = "";
        let isFirst = true;
        for (const comment of comments) {
            const commentItem = this.#generateCommentItem(comment);
            if (!isFirst) {
                content += `
                    <hr />
                    <div class="row">${commentItem}</div>
                `;
            } else {
                content += `<div class="row">${commentItem}</div>`;
                isFirst = false;
            }
        }
        return content;
    }

    #generateCommentItem(comment) {
        return `
            <div>
                <img src="upload/${comment.userimg}" alt="Profile image" class="img-thumbnail rounded-circle" style="width:50px; height:50px"/>
                <span class="">${comment.username}</span>
                <span class="text-muted float-end pt-2">${Utils.generateTimeElapsedString(comment.createdAt)}</span>

                <p>${comment.comment}</p>
            </div>
        `;
    }

    updateCommentsList(){
        axios.get("api/api-comments.php",{
            params:{
                pid: this._data.postid
            }
        }).then(response => {
            const newCommentList = this.#generateCommentsList(response.data.comments);
            const commentListElement = document.getElementById('commentsList-'+this._data.postid);
            commentListElement.innerHTML = newCommentList;
            this._getComponent('popupOpenElement').updateCommentsCount(response.data.comments.length);
        });
    }

    _remove() {
        document.body.removeChild(this._popup);
    }
}

export { CommentsListPopup };