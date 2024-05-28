import { Listener } from "../../utils/listener.js";

class LogoutIcon {
    _icon;
    _listeners;

    constructor() {
        this._icon = document.createElement('span');
        this.logoutCallback = this.logoutCallback.bind(this);
        this._listeners = {
            "logoutIconClick": new Listener("#logoutIcon", "click", this.logoutCallback),
        };
    }

    generateComponent(data = undefined) {
        this._icon.id = "logoutIcon";
        this._icon.classList.add("d-inline-block", "align-middle", "bi", "bi-box-arrow-right", "fs-3");

        return this._icon;
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

export { LogoutIcon };