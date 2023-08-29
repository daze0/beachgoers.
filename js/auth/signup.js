import { SignupAuthForm } from './view-components/authForm.js';
import { AuthViewLayout } from './view-layouts/authViewLayout.js';

function init() {
    const components = {"authForm": new SignupAuthForm()};

    const layout = new AuthViewLayout(components);
    
    axios.get("api/api-signup.php").then(response => {
        if (!response.data["signup_success"]) {
            layout.render(document.querySelector("main"));
        } else {
            document.querySelector("main").innerHTML = components["authForm"].generateSignupSuccessLayout(response.data["username"]);
        }
    });
}

init();