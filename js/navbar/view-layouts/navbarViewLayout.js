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
        <a href="#" class="navbar-brand mb-0 h1 ms-2">
        ConnectU
        </a>
        <div class="d-flex mt-2 mb-2">
            <a href="feed.php" class="navbar-brand mb-0 h1">
                <i class="bi bi-house-fill"></i>
            </a>
            <a href="profile.php" class="navbar-brand mb-0 h1">
                <i class="bi bi-person-fill"></i>
            </a>
            <form class="form-inline">
                <div class="input-group">
                    <input class="form-control" type="search" placeholder="Search" aria-label="Search">
                    <div class="input-group-append">
                        <button class="btn btn-outline-dark" type="submit">
                            <i class="bi bi-search"></i>
                        </button>
                    </div>
                </div>
            </form>
            <a href="#" class="navbar-brand ms-2 mb-0 h1">
                ${this.#components["logoutIcon"].generateComponent().outerHTML}
            </a>
        </div>
        `;
    }
}

export { NavbarViewLayout };