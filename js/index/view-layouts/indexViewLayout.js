class IndexViewLayout {
    render(rootElement) {
        rootElement.innerHTML = this.#generate();
    }

    #generate() {
        return `
        <div class="col-md-3"></div>
        <div class="container col-sm-12 col-md-6 py-4">
            <header class="pb-3 mb-4 mt-4">
                <h1 class="display-1 text-center"><a class="text-decoration-none pb-2 rounded-3" href="index.php">beachgoers.</a></h1>
            </header>
            <div class=" mb-4 p-5 rounded-3">
                <div class="container-fluid py-5">
                    <div class="row">
                        <p class="col-12 fs-4">
                            <strong>Connect</strong> with your family, friends and people from all over the world.
                            <br /><br />
                            <strong>Explore</strong> and <strong>thrive</strong> in this new and unique social universe, always remember to show
                            some respect to other people.
                            <br /><br />
                            Now that you know what you're getting into...
                            <br />
                            ...let's dive in.
                            <br /><br />
                        </p>
                    </div>
                    <div class="row">
                        <div class="d-grid gap-2">
                            <a href="login.php">
                                <button class="btn btn-lg w-100" type="button">
                                    <i class="bi bi-box-arrow-in-right"></i> Log-in
                                </button>
                            </a>
                            <p class="text-start p-2"><i>Don't have an account? Register <a class="" href="signup.php"><strong>here</strong></a></i></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-3"></div>`;
    }
}

export { IndexViewLayout };