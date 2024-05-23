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
            <div class="d-flex flex-column flex-md-row w-100 align-items-center justify-content-md-between">
                <div class="d-flex flex-row flex-md-col w-100 justify-content-center justify-content-md-start">
                    <a href="#" class="navbar-brand navbar-color mb-0 ms-2 h1">
                        beachgoers.
                    </a>
                </div>
                <div class="d-flex flex-row flex-md-col w-100 justify-content-center justify-content-md-end">
                    <a href="feed.php" class="nav-link mb-0">
                        <i class="bi bi-house-fill fs-3 navbar-color"></i>
                    </a>
                    <a href="profile.php" class="nav-link mb-0">
                        <i class="bi bi-person-fill fs-3 navbar-color"></i>
                    </a>
                    ${this.#components["notificationButton"].generateComponent().outerHTML}
                    <a href="#" class="nav-link mb-0">
                        ${this.#components["logoutIcon"].generateComponent().outerHTML}
                    </a>
                </div>
                <div class="d-flex flex-column flex-md-row w-50 justify-content-center">
                    ${this.#components["searchForm"].generateComponent().outerHTML}
                </div>
                
            </div>
        </div>
        `;
    }
}

export { NavbarViewLayout };