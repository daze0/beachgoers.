import { LoginAuthForm } from './view-components/authForm.js';
import { AuthViewLayout } from './view-layouts/authViewLayout.js';

function init() {
    const components = {"authForm": new LoginAuthForm()};

    const layout = new AuthViewLayout(components);
    layout.render(document.querySelector("main"));
}

init();