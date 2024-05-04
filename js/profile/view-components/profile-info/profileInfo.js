import { FollowButton } from './followButton.js';
import { TelegramButton } from './telegramButton.js';
import { FollowersListPopup } from '../../../popups/view-layouts/followersListPopup.js';
import { FollowingListPopup } from '../../../popups/view-layouts/followingListPopup.js';

class ProfileInfo {
    #components;
    #data;
    #userInfo;

    constructor() {
        this.#components = {
            "followButton": new FollowButton(),
            "telegramButton": new TelegramButton(),
            "followersListPopup": undefined,
            "followingListPopup": undefined
        };
        this.#data = undefined;
        this.#userInfo = {
            "followers": undefined,
            "following": undefined,
            "likes": undefined,
            "posts": undefined
        };
    }

    getUserInfo() {
        return this.#userInfo;
    }

    updateUserInfo(label, value) {
        // Sub-optimal solution, but it works for now
        if (label in this.#userInfo) {
            this.#userInfo[label] = value;
            // Re-render user info
            if (label == "followers") {
                // not needed atm
            } else if (label == "following") {
                // not needed atm
            } else if (label == "likes") {
                const likes = document.querySelector(
                    "main > div.row:first-child > div:nth-child(2) > div.row > div:first-child > div.row > div.row:last-child > div:nth-child(3) > div.row > div:last-child > p"
                );
                likes.innerHTML = this.#userInfo[label];
            } else if (label == "posts") {
                // not needed atm
            }
        } else {
            throw new Error("Info label provided is invalid.");
        }
    }

    generateComponent(data, updatedUserInfo = undefined) {
        this.#data = data;

        if (updatedUserInfo) {
            this.#userInfo = updatedUserInfo;
        } else {
            this.#userInfo["followers"] = data["followers"];
            this.#userInfo["following"] = data["following"];
            this.#userInfo["likes"] = data["likes"];
            this.#userInfo["posts"] = data["posts"];
        }

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
                ${this.#components["followersListPopup"].getPopupOpenElement().generateComponent(this.#userInfo["followers"])}
            `,
            "following": `
                ${this.#components["followingListPopup"].getPopupOpenElement().generateComponent(this.#userInfo["following"])}
            `,
            "likes": `
                <div class="row">
                    <div class="col-6">
                        <i class='bi bi-heart' aria-hidden="true" aria-label="likes" title="likes"></i>
                    </div>
                    <div class="col-6">
                        <p>${this.#userInfo["likes"]}</p>
                    </div>
                </div>
            `,
            "posts": `
                <div class="row">
                    <div class="col-6">
                        <i class='bi bi-file-text' aria-hidden="true" aria-label="posts" title="posts"></i>
                    </div>
                    <div class="col-6">
                        <p>${this.#userInfo["posts"]}</p>
                    </div>
                </div>
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