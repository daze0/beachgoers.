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
                this.#components["profileInfo"].generateComponent(this.#userData) :
                this.#components["profileInfo"].generateComponent(this.#userData, updatedUserInfo)
            }
            </div>
            <div class="row bg-light pt-5 mb-5">
                <div id="spacingStartSection" class="col-3"></div>
                <div id="commentSection" class="d-none"></div>
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