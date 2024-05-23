import { Listener } from "../../utils/listener.js";
import { Utils } from "../../utils/utils.js";

class NotificationButton {
    _listeners;

    constructor() {
        this.notificationButtonCallback = this.notificationButtonCallback.bind(this);
        this._listeners = {
            "notificationButtonCallback": new Listener("#notificationButton", "click", this.notificationButtonCallback),
        };
    }

    generateComponent() {
        const button = document.createElement("a");
        button.id = "notificationButton";
        button.classList.add("nav-link", "mb-0", "position-relative");
        button.href = "#";

        const icon = document.createElement("i");
        icon.classList.add("d-inline-block", "align-top", "bi", "bi-bell-fill", "navbar-color", "fs-3");
        button.append(icon);

        const badge = document.createElement("span");
        badge.id = "notificationButtonBadge";
        badge.classList.add("badge", "bg-danger", "text-white", "position-absolute", "start-100",
            "translate-middle", "rounded-circle", "d-none");
        badge.style.fontSize = "0.75rem";
        badge.style.padding = "0.2rem 0.4rem";
        button.append(badge);

        return button;
    }

    updateBadgeCount() {
        axios.get("api/api-notifications.php?count=1").then(response => {
            const count = response.data.count;
            const badge = document.getElementById("notificationButtonBadge");
            if (count) {
                badge.classList.remove("d-none");
                badge.textContent = count;
            } else {
                badge.classList.add("d-none");
            }
        }).catch(error => {
            console.log("Error detected while getting notifications count: " + error);
        });
    }

    #generateTelegramButtonItem() {
        const item = document.createElement("div");
        item.classList.add("notification-item", "p-2", "border-bottom");


        const itemLink = document.createElement("a");
        itemLink.classList.add('btn', 'w-100', 'h-100');
        itemLink.href = "https://t.me/BeachgoersBot";
        itemLink.target = "_blank";
        itemLink.innerHTML = '<i class="bi bi-telegram"></i>' + " Click to open telegram bot";
        item.appendChild(itemLink);
        return item;
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

    notificationButtonCallback() {
        if (document.getElementById("notification-list")) {
            return;
        }
        axios.get("api/api-notifications.php").then(response => {
            const notificationList = document.createElement("div");
            notificationList.id = "notification-list";
            notificationList.classList.add('navbar-dark-color');

            const notifications = response.data.notifications;
            for (const notification of notifications) {
                const notificationItem = document.createElement("div");
                notificationItem.classList.add("notification-item", "p-2", "border-bottom");

                if (!notification.read) {
                    notificationItem.classList.add("notification-item-unread");
                    const notificationItemUnreadBadge = document.createElement("span");
                    notificationItemUnreadBadge.classList.add("my-2", "me-1", "float-start",
                        "p-1", "bg-danger", "border", "border-light", "rounded-circle");
                    notificationItem.append(notificationItemUnreadBadge);

                }

                const notificationItemDateTime = document.createElement("span");
                notificationItemDateTime.classList.add("float-end", "notification-elapsed-time");
                notificationItemDateTime.textContent = Utils.generateTimeElapsedString(notification.createdAt);
                notificationItem.appendChild(notificationItemDateTime);

                const notificationItemContent = document.createElement("div");
                notificationItemContent.innerHTML = notification.content;
                notificationItem.appendChild(notificationItemContent);


                notificationList.append(notificationItem);
            }

            notificationList.append(this.#generateTelegramButtonItem());

            const navbar = document.querySelector(".navbar");
            navbar.append(notificationList);
            //const notificationBadge = document.getElementById("notificationButtonBadge");
            //notificationBadge.classList.add("d-none");
            this.updateBadgeCount();

            document.addEventListener("click", e => {
                notificationList.remove();
            }, { once: true });
        }).catch(error => {
            console.log("Error detected while getting notifications: " + error);
        });
    }
}

export { NotificationButton };