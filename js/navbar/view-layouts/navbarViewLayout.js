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
        <div class="container-fluid py-4">
            <div class="d-flex flex-column flex-md-row w-100 align-items-center justify-content-md-between">
                <div class="d-flex flex-row flex-md-col mb-2 mb-md-0 w-100 justify-content-center justify-content-md-start">
                    <a href="#" class="navbar-brand navbar-color mb-0 ms-2 h1">
                        beachgoers.
                    </a>
                </div>
                <div class="d-flex flex-row flex-md-col mb-2 mb-md-0 ms-2 ms-md-0 me-3 w-100 justify-content-center justify-content-md-end">
                    <a href="feed.php" class="nav-link mb-0 me-4 me-md-3" title="Home">
                        <span class="bi bi-house-fill fs-3 navbar-color"></span>
                    </a>
                    <a href="profile.php" class="nav-link mb-0 me-4 me-md-3" title="Profile">
                        <span class="bi bi-person-fill fs-3 navbar-color"></span>
                    </a>
                    ${this.#components["notificationButton"].generateComponent().outerHTML}
                    <a href="#" class="nav-link mb-0 ms-4 mx-md-3" title="Logout">
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