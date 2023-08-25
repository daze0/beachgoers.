class IndexViewLayout {
    render(rootElement) {
        rootElement.innerHTML = this.#generate();
    }

    #generate() {
        return `
        <div class="col-3"></div>
        <div class="container col-6 py-4">
            <header class="pb-3 mb-4 mt-4">
                <h1 class="display-1 text-center"><a class="text-decoration-none text-light" href="index.php">< ConnectU ></a></h1>
            </header>
            <div class="p-5 rounded-3">
                <div class="container-fluid py-5">
                    <div class="row">
                        <p class="col-12 fs-4 text-light">
                            <b>Connect</b> with your family, friends and people from all over the world.
                            <br /><br />
                            <b>Explore</b> and <b>thrive</b> in this new and unique social universe, always remember to show
                            some respect to other people, be kind.
                            <br /><br />
                            Now that you know what you're getting into...
                            <br />
                            ...let's dive in.
                            <br /><br />
                        </p>
                    </row>
                    <div class="row">
                        <div class="col-3">
                            <a href="login.php">
                                <button class="btn btn-light btn-lg text-dark" type="button">
                                    <img class="me-2" src="upload/index-login-btn-icon.png" alt="Log-in" />Log-in
                                </button>
                            </a>
                        </div>
                        <div class="col-9">
                            <p class="text-start text-light p-2"><i>Don't have an account? Register <a class="text-dark" href="signup.php"><b>here</b></a></i></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-3"></div>`;
    }
}

export { IndexViewLayout };