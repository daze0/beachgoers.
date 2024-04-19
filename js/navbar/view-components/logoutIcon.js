import { Listener } from "../../utils/listener.js";

class LogoutIcon {
    constructor() {
        this._img = document.createElement('img');
        this.logoutCallback = this.logoutCallback.bind(this);
        this._listeners = {
            "logoutIconClick": new Listener("#logoutIcon", "click", this.logoutCallback),
        };
    }

    generateComponent(data=null) {
        this._img.id = "logoutIcon";
        this._img.classList.add("d-inline-block", "align-top");
        this._img.src = "img/logout.png";
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

    logoutCallback() {
        console.log("logout");
        axios.get("api/api-login.php?logout=true").then(response => {
            window.location.href = 'index.php';
        }).catch(error => {
            console.log("Error detected while logging out: " + error);
        });
    }
}

export { LogoutIcon }