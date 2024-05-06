import { LoginAuthForm } from './view-components/authForm.js';
import { AuthViewLayout } from './view-layouts/authViewLayout.js';

function init() {
    const components = { "authForm": new LoginAuthForm() };

    const layout = new AuthViewLayout(components);

    axios.get("api/api-login.php").then(response => {
        if (!response.data["login_success"]) {
            layout.render(document.querySelector("main"));
        } else {
            document.querySelector("main").innerHTML = components["authForm"].generateLoginSuccessLayout(response.data["username"]);
            setTimeout(() => {
                window.location.href = "feed.php";
            }, 500);
        }
    });
}

init();