class AuthViewLayout {
    #components;
    #firstRender;

    constructor(components) {
        this.#components = components;
        this.#firstRender = true;
    }

    render(rootElement) {
        if (this.#firstRender) {
            this.#firstRender = false;
        } else {
            this.#components["authForm"].getListener().attachListener()
        }
        rootElement.innerHTML = this.#generate();
        this.#components["authForm"].getListener().attachListener();
    }

    #generate() {
        let res = `
        <div class="col-2"></div>
        <div class="container col-8 py-4">
            <header class="pb-3 mb-4 mt-4">
                <h1 class="display-1 text-center"><a class="text-decoration-none text-dark" href="index.php">< ConnectU ></a></h1>
            </header>
            <div class="p-5 rounded-3">
                <div class="row container-fluid py-5">
                    <div class="col-md-5">
                        <img class="img-fluid mt-2" src="upload/iphone.png" alt="iphone frame" />
                    </div>`;
        res += this.#components["authForm"].generateComponent().outerHTML;
        res += `
                </div>
            </div>
        </div>
        <div class="col-2"></div>`;

        return res;
    }
}

export { AuthViewLayout };