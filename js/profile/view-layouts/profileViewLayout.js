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
            // Save user info before update
            const userInfo = this.#components["profileInfo"].getUserInfo();
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

    getUserFeedData() {
        return this.#userFeedData;
    }

    setUserFeedData(value) {
        this.#userFeedData = value;
    }

    getComponent(label) {
        if (label in this.#components) {
            return this.#components[label];
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
            <div class="row gx-0">
                ${updatedUserInfo == undefined ?
                this.#components["profileInfo"].generateComponent(this.#userData, this) :
                this.#components["profileInfo"].generateComponent(this.#userData, this, updatedUserInfo)
            }
            </div>
            <div class="row gx-0 pt-5 mb-5">
                <div id="spacingStartSection" class="col-sm-1 col-md-4"></div>
                <div id="spacingCenterSection" class="d-none"></div>
                <div id="postSection" class="col-sm-10 col-md-4">
                    ${this.#components["profileFeed"].generateComponent(this.#userData, this.#userFeedData, this)}
                    ${this.#components["profileFeed"].getComponent("loadingElement").generateComponent()}
                </div>
                <div id="spacingEndSection" class="col-sm-1 col-md-4 pe-0"></div>
            </div>
        `;

        return res;
    }
}

export { ProfileViewLayout };