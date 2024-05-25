class AuthViewLayout {
    #components;

    constructor(components) {
        this.#components = components;
    }

    render(rootElement) {
        rootElement.innerHTML = this.#generate();
        this.#components["authForm"].attachListeners();
    }

    #generate() {
        let res = `
        <div class="row">
            <div class="col-md-3"></div>
            <div class="col-12 col-md-6 auth-wrapper py-4">
                <header class="pb-3 mb-4 mt-4">
                    <h1 class="display-1 text-center"><a class="text-decoration-none pb-2 rounded-3" href="index.php">beachgoers.</a></h1>
                </header>
                <div class="p-5 rounded-3">
                    <div class="row px-4 py-5">`;
        res += this.#components["authForm"].generateComponent().outerHTML;
        res += `
                    </div>
                </div>
            </div>
            <div class="col-md-3"></div>
        </div>`;

        return res;
    }
}

export { AuthViewLayout };