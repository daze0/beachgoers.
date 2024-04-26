import { FollowButton } from './followButton.js';
import { TelegramButton } from './telegramButton.js';
import { FollowersListPopup } from '../../../popups/view-layouts/followersListPopup.js';
import { FollowingListPopup } from '../../../popups/view-layouts/followingListPopup.js';

class ProfileInfo {
    #components;
    #data;

    constructor() {
        this.#components = {
            "followButton": new FollowButton(),
            "telegramButton": new TelegramButton(),
            "followersListPopup": undefined,
            "followingListPopup": undefined
        };
        this.#data = undefined;
    }

    generateComponent(data) {
        this.#data = data;
        const profileInfo = this.#generateProfileInfo(data);
        return profileInfo;
    }

    attachListeners() {
        if (!this.#data["personal_profile"]) {
            Object.entries(this.#components)
                .forEach(([label, component]) => component.attachListeners());
        } else {
            Object.entries(this.#components)
                .filter(([label, component]) => label != "followButton" && label != "telegramButton")
                .forEach(([label, component]) => component.attachListeners());
        }
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
            ${this.#components["telegramButton"].generateComponent(userData["personal_profile"], userData["telegram_username"])}
        </div>
        `;
    }

    #generateUserImg(userData) {
        return `<img src="upload/${userData["profile_picture"]}" alt="profile picture" class="img-thumbnail position-absolute top-50 start-50 translate-middle" />`;
    }

    #generateUsername(userData) {
        return `
            <div class="row">
                <p class="text-start fs-5">@${userData["username"]}</p>
            </div>
        `;
    }

    #generateUserInfo(userData) {
        // Renders following and followers list elements(they trigger popups) along with likes and posts number elements
        return `
        <div class="row">
            ${this.#populateUserInfoRow(userData)
            }
        </div>
    `;
    }

    #populateUserInfoRow(userData) {
        this.#components["followersListPopup"] = new FollowersListPopup(userData["followers_list"]);
        this.#components["followingListPopup"] = new FollowingListPopup(userData["following_list"]);
        this.#components["followersListPopup"].render();
        this.#components["followingListPopup"].render();

        const userInfoElements = {
            "followers": `
                ${this.#components["followersListPopup"].getPopupOpenElement().generateComponent(userData["followers"])}
            `,
            "following": `
                ${this.#components["followingListPopup"].getPopupOpenElement().generateComponent(userData["following"])}
            `,
            "likes": `
                <button class="btn">
                    <i class='bi bi-heart'></i>
                    <p>${userData["likes"]}</p>
                </button>
            `,
            "posts": `
                <button class="btn">
                    <i class='bi bi-file-text'></i>
                    <p>${userData["posts"]}</p>
                </button>
            `
        };

        let res = "";

        for (const key of Object.keys(userInfoElements)) {
            res += `
                <div class="col-3">
                    ${userInfoElements[key]}
                </div >
            `;
        }

        return res;
    }
}

export { ProfileInfo }