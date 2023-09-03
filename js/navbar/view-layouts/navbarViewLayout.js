class NavbarViewLayout {
    #components;

    constructor(components) {
        this.#components = components;
    }

    render(rootElement) {
        rootElement.innerHTML = this.#generate();
    }

    #generate() {
        return `
        <a href="#" class="navbar-brand mb-0 h1 ms-2">
        ConnectU
        </a>
        <div class="d-flex mt-2 mb-2">
            <a href="feed.php" class="navbar-brand mb-0 h1">
                <img class="d-inline-block align-top" src="upload/feed.png" width="30" height="30" />
            </a>
            <a href="profile.php" class="navbar-brand mb-0 h1">
                <img class="d-inline-block align-top" src="upload/profile.png" width="30" height="30" />
            </a>
            <form class="form-inline">
                <div class="input-group">
                    <input class="form-control" type="search" placeholder="Search" aria-label="Search">
                    <div class="input-group-append">
                        <button class="btn btn-outline-dark" type="submit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
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