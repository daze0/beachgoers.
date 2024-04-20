import { Utils } from '../../../utils/utils.js';
import { FollowButton } from './followButton.js';

class ProfileInfo {
    #components;

    constructor() {
        this.#components = {
            "followButton": new FollowButton()
        }; //TODO: define components
    }

    generateComponent(data) {
        const profileInfo = this.#generateProfileInfo(data);
        return profileInfo;
    }

    attachListeners() {
        Object.entries(this.#components).forEach(([label, component]) => {
            component.attachListeners();
        });
    }

    #generateProfileInfo(userData) {
        return `
        <div class="col-3 p-4 text-center position-relative">
            ${this.#generateUserImg(userData)}
        </div>
        <div class="col-6 py-4">
            <div class="row">
                <div class="col-6 col-lg-4 col-xs-10">
                    <div class="row pe-0">
                        ${this.#generateUsername(userData)}
                        ${this.#generateUserInfo(userData)}
                    </div>                    
                </div>
                <div class="col-6 col-lg-8 col-xs-2 pe-0"></div>
            </div>
        </div>
        <div class="col-3 py-4 pe-0">
            ${this.#components["followButton"].generateComponent(userData["personal_profile"], userData["follow_status"])}
        </div>
        `;
    }

    #generateUserImg(userData) {
        return `<img src="upload/${userData["profile_picture"]}" alt="profile picture" class="img-thumbnail position-absolute top-50 start-50 translate-middle" />`;
    }

    #generateUsername(userData) {
        return `
            <div class="row">
                <p class="text-center fs-5">@${userData["username"]}</p>
            </div>`;
    }

    #generateUserInfo(userData) {
        return undefined;
    }

    /* #generateFollowersSvg() {
        return Utils.generateSvg("bi-people", "followers", "M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z");
    }
    
    #generateFollowingSvg() {
        return Utils.generateSvg("bi-people-fill", "following", "M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z");
    }
    
    #generatePostsSvg() {
        return Utils.generateSvg("bi-file-text-fill", "posts", "M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM5 4h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm0 2h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1z");
    }
    
    #generateLikesSvg() {
        return Utils.generateSvg("bi-hearth-fill", "likes", "M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z");
    } */
}

export { ProfileInfo }