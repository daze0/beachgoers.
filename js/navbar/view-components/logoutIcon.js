import { LogoutIconListener } from "./listeners/logoutIconListener.js";

class LogoutIcon {
    constructor() {
        this._img = document.createElement('img');
        this.formSubmitCallback = this.formSubmitCallback.bind(this);
        this._formLabels = formLabels;
        this._listeners = {
            "logoutIcon": new LogoutIconListener("#logoutIcon", "click", this.#logoutCallback),
        };
    }

    generateComponent(data=null) {
        this._img.classList.add("d-inline-block", "align-top");
        this._img.src = "upload/logout.png";
        this._img.width = 30;
        this._img.height = 30;

        return this._img;
    }

    getListener(label) {
        return this._listeners[label];
    }

    attachListeners() {
        const listeners = Object.values(this._listeners);
        listeners.forEach(listener => listener.attachListener());
    }

    detachListeners() {
        const listeners = Object.values(this._listeners);
        listeners.forEach(listener => listener.detachListener());
    }

    #logoutCallback() {
        axios.get("api/api-login.php?logout=true").catch(error => {
            console.log("Error detected while logging out: " + error);
        });
    }
}

export { LogoutIcon }