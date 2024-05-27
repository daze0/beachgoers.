import { FollowButton } from './followButton.js';
import { TelegramButton } from './telegramButton.js';
import { FollowersListPopup } from '../../../popups/view-layouts/followersListPopup.js';
import { FollowingListPopup } from '../../../popups/view-layouts/followingListPopup.js';
import { TelegramConnectorPopup } from '../../../popups/view-layouts/telegramConnectorPopup.js';

class ProfileInfo {
    #layout;
    #components;
    #data;
    #userInfo;

    constructor() {
        this.#components = {
            "followButton": new FollowButton(),
            "telegramButton": new TelegramButton(),
            "followersListPopup": undefined,
            "followingListPopup": undefined,
            //'telegramConnectorPopup':undefined
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
            const userInfoContainers = document.querySelectorAll(".user-info-value");
            console.log(userInfoContainers);
            // Re-render user info
            if (label == "followers") {
                const followers = userInfoContainers[0];
                followers.innerHTML = this.#userInfo[label];
            } else if (label == "following") {
                const following = userInfoContainers[1];
                following.innerHTML = this.#userInfo[label];
            } else if (label == "likes") {
                const likes = userInfoContainers[2];
                likes.innerHTML = this.#userInfo[label];
            } else if (label == "posts") {
                // not needed atm
            }
        } else {
            throw new Error("Info label provided is invalid.");
        }
    }

    generateComponent(data, layout, updatedUserInfo = undefined) {
        this.#data = data;
        this.#layout = layout;

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
        <div class="d-flex flex-column flex-md-row profile-info w-100 align-items-center justify-content-md-between"> 
            <div class="d-flex flex-row flex-md-column p-4 w-50 position-relative">
                ${this.#generateUserImg(userData)}
            </div>
            <div class="d-flex flex-row flex-md-column user-info ps-md-5 py-4 w-100 justify-content-center justify-content-md-start">
                <div class="row">
                    <div class="col-1 col-md-1 col-xl-1"></div>
                    <div class="col-10 text-center col-md-5 col-xl-3 col-xs-10">
                        <div class="row pe-0">
                            ${this.#generateUsername(userData)}
                            ${this.#generateUserInfo(userData)}
                        </div>                    
                    </div>
                    <div class="col-1 col-md-6 col-xl-8 col-xs-2 pe-0"></div>
                </div>
            </div>
            <div class="d-flex flex-column flex-lg-row justify-content-center justify-content-lg-start py-4 px-5 ps-md-0 pe-md-5 w-75 w-md-auto">
                ${this.#components["followButton"].generateComponent(userData["personal_profile"], userData["follow_status"], this.#layout)}
                ${this.#components["telegramButton"].generateComponent(userData["personal_profile"], userData["telegram_username"])}
                ${this.#generateEnableNotificationContent(userData["personal_profile"], userData)}
            </div>
        </div>
        `;
    }

    #generateEnableNotificationContent(isPersonalProfile, userData) {
        if (isPersonalProfile) {
            if (!userData["telegram_chat_id"]) {
                this.#components["telegramConnectorPopup"] = new TelegramConnectorPopup(userData);
                this.#components["telegramConnectorPopup"].render();
                return this.#components["telegramConnectorPopup"].getPopupOpenElement().generateComponent();
            } else {
                return `
                    <p>Notifications enabled</p>
                `;
            }
        } else {
            return "";
        }
    }

    #generateUserImg(userData) {
        return `<img src="upload/${userData["profile_picture"]}" alt="profile picture" class="img-thumbnail profile-picture" />`;
    }

    #generateUsername(userData) {
        return `
            <div class="d-flex flex-row justify-content-center justify-content-md-start ps-0 px-md-0">
                <p class="fs-5">${userData["username"]}</p>
            </div>
        `;
    }

    #generateUserInfo(userData) {
        // Renders following and followers list elements(they trigger popups) along with likes and posts number elements
        return `
        <div class="d-flex flex-row justify-content-center justify-content-md-start px-md-0">
            ${this.#populateUserInfoRow(userData)}
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
                <div class="d-flex flex-row gx-0">
                    <div class="d-flex flex-column me-2 custom-secondary-color">
                        <i class='bi bi-heart' aria-hidden="true" aria-label="likes" title="likes"></i>
                    </div>
                    <div class="d-flex flex-column">
                        <p class="user-info-value">${this.#userInfo["likes"]}</p>
                    </div>
                </div>
            `,
            "posts": `
                <div class="d-flex flex-row gx-0">
                    <div class="d-flex flex-column me-2 custom-secondary-color">
                        <i class='bi bi-file-text' aria-hidden="true" aria-label="posts" title="posts"></i>
                    </div>
                    <div class="d-flex flex-column">
                        <p class="user-info-value">${this.#userInfo["posts"]}</p>
                    </div>
                </div>
            `
        };

        let res = "";
        let idx = 0;

        for (const key of Object.keys(userInfoElements)) {
            if (idx == Object.keys(userInfoElements).length - 1) {
                // Last element 
                res += `
                <div class="d-flex flex-column justify-content-start">
                `;
            } else if (idx == 0) {
                // First element
                res += `
                <div class="d-flex flex-column justify-content-start ms-0 me-4">
                `;
            } else {
                // Middle elements
                res += `
                <div class="d-flex flex-column justify-content-start me-4">
                `;
            }
            res += `
                    ${userInfoElements[key]}
                </div >
            `;
            idx += 1;
        }

        return res;
    }
}

export { ProfileInfo }