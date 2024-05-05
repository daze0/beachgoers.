class ProfileViewLayout {
    #components;
    #userData;
    #userFeedData;

    constructor(components, userData, userFeedData) {
        this.#components = components;
        this.#userData = userData;
        this.#userFeedData = userFeedData;
    }

    renderUpdate(updateType, action, data) {
        if (updateType == "USER_INFO") {
            // Save user info before render
            const userInfo = this.#components["profileInfo"].getUserInfo();
            // If defined, data is the userFeedData to be propagated to the next render
            if (data != undefined) {
                this.#userFeedData = data;
            }
            // Render updated user info
            this.render(document.querySelector("main"), userInfo);
            // Update user info after render
            if (action == "add_like") {
                console.log("[USER_INFO] add_like");
                let preRenderLikes = userInfo["likes"];
                this.#components["profileInfo"].updateUserInfo("likes", ++preRenderLikes);
            } else if (action == "remove_like") {
                console.log("[USER_INFO] remove_like");
                let preRenderLikes = userInfo["likes"];
                this.#components["profileInfo"].updateUserInfo("likes", --preRenderLikes);
            } else if (action == "add_follower") {
                console.log("[USER_INFO] add_follower");
                let preRenderFollowers = userInfo["followers"];
                this.#components["profileInfo"].updateUserInfo("followers", ++preRenderFollowers);
            } else if (action == "remove_follower") {
                console.log("[USER_INFO] remove_follower");
                let preRenderFollowers = userInfo["followers"];
                this.#components["profileInfo"].updateUserInfo("followers", --preRenderFollowers);
            } else if (action == "add_following") {
                console.log("[USER_INFO] add_following");
                let preRenderFollowing = userInfo["following"];
                this.#components["profileInfo"].updateUserInfo("following", ++preRenderFollowing);
            } else if (action == "remove_following") {
                console.log("[USER_INFO] remove_following");
                let preRenderFollowing = userInfo["following"];
                this.#components["profileInfo"].updateUserInfo("following", --preRenderFollowing);
            }
        }
    }

    render(rootElement, updatedUserInfo = undefined) {
        rootElement.innerHTML = this.#generate(updatedUserInfo);
        this.#attachListeners();
    }

    #attachListeners() {
        Object.entries(this.#components).forEach(([label, component]) => {
            component.attachListeners();
        });
    }

    #generate(updatedUserInfo = undefined) {
        let res = `
            <div class="row bg-light">
                ${updatedUserInfo == undefined ?
                this.#components["profileInfo"].generateComponent(this.#userData, this) :
                this.#components["profileInfo"].generateComponent(this.#userData, this, updatedUserInfo)
            }
            </div>
            <div class="row bg-light pt-5 mb-5">
                <div id="spacingStartSection" class="col-3"></div>
                <div id="spacingCenterSection" class="d-none"></div>
                <div id="postSection" class="col-6 overflow-auto">
                    <div class="bg-light">
                        ${this.#components["profileFeed"].generateComponent(this.#userData, this.#userFeedData, this)}
                    </div>
                </div>
                <div id="spacingEndSection" class="col-3 pe-0"></div>
            </div>
        `;

        return res;
    }
}

export { ProfileViewLayout };