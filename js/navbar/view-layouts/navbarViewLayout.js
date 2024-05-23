class NavbarViewLayout {
    #components;

    constructor(components) {
        this.#components = components;
    }

    render(rootElement) {
        /*
            Detach only if already attached.
            TODO: define it's useful or not to check the above condition

            Object.entries(this.#components).forEach(([label, component]) => {
                component.detachListeners();
            });
        */
        rootElement.innerHTML = this.#generate();
        Object.entries(this.#components).forEach(([label, component]) => {
            component.attachListeners();
        });
        this.#components.notificationButton.updateBadgeCount();
    }

    #generate() {
        return `
        <div class="container-fluid">
        <a href="#" class="navbar-brand navbar-color mb-0 h1 ms-2">
            beachgoers.
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglable" aria-controls="navbarTogglable" aria-expanded="false" aria-label="Toggle navigation options">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglable">
            <ul class="navbar-nav ms-auto me-4 mt-2 mb-2">
                <li class="nav-item me-2 mb-1">
                    <a href="feed.php" class="navbar-link mb-0 h1">
                        <i class="bi bi-house-fill fs-3 navbar-color"></i>
                    </a>
                </li>
                <li class="nav-item me-2 mb-1">
                    <a href="profile.php" class="navbar-link mb-0 h1">
                        <i class="bi bi-person-fill fs-3 navbar-color"></i>
                    </a>
                </li>
                <li class="nav-item me-2 mb-1">
                    ${this.#components["notificationButton"].generateComponent().outerHTML}
                </li>
                <li class="nav-item mb-1">
                    <a href="#" class="navbar-link mb-0 h1">
                        ${this.#components["logoutIcon"].generateComponent().outerHTML}
                    </a>
                </li>
            </ul>
            ${this.#components["searchForm"].generateComponent().outerHTML}
        </div></div>
        `;
    }
}

export { NavbarViewLayout };