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
    }

    #generate() {
        return `
        <a href="#" class="navbar-brand navbar-color mb-0 h1 ms-2">
            beachgoers.
        </a>
        ${this.#components["searchForm"].generateComponent().outerHTML}
        <div class="d-flex mt-2 mb-2">
            <a href="feed.php" class="navbar-brand mb-0 h1">
                <i class="bi bi-house-fill navbar-color"></i>
            </a>
            <a href="profile.php" class="navbar-brand mb-0 h1">
                <i class="bi bi-person-fill navbar-color"></i>
            </a>
            <a href="#" class="navbar-brand ms-2 mb-0 h1">
                ${this.#components["logoutIcon"].generateComponent().outerHTML}
            </a>
        </div>
        `;
    }
}

export { NavbarViewLayout };