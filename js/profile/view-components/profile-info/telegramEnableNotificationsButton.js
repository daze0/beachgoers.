import { Listener } from '../../../utils/listener.js';

class telegramEnableNotificationsButton {
    #connectButton;
    _listeners;

    constructor() {
        this.#connectButton = undefined;
        this.connectButtonCallback = this.connectButtonCallback.bind(this);
        this._listeners = {
            "connectButtonClick": new Listener("#telegramEnableNotificationsButton", "click", this.connectButtonCallback),
        };
    }

    generateComponent() {
        this.#generateConnectButton();
        return this.#connectButton.outerHTML;
    }

    connectButtonCallback() {
        axios.get("api/api-profile.php?checkTelegramBotActivation=true").then(response => {
            const responseDiv = document.getElementById("telegram-enable-notifications-result");
            if(response.data.telegram_bot_active){
                responseDiv.textContent = "Notifications enabled.";
                setTimeout(() => {
                    location.reload();
                }, 3000);
            }else{
                responseDiv.textContent = "Connection failed, retry steps.";
            }
        }).catch(error => {
            console.log("Error detected while connecting telegram bot: " + error);
        });
    }

    getListener(label) {
        return this._listeners[label];
    }

    attachListeners() {
        const listeners = Object.values(this._listeners);
        listeners.forEach(listener => listener.attachListener());
    }

    #generateConnectButton() {
        this.#connectButton = document.createElement("button");
        this.#connectButton.id = "telegramEnableNotificationsButton";
        this.#connectButton.type = "button";
        this.#connectButton.classList.add("btn");
        this.#connectButton.textContent = "Enable notifications";
    }
}

export { telegramEnableNotificationsButton }
