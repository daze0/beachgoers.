import { LogoutIcon } from './view-components/logoutIcon.js';
import { NavbarViewLayout } from './view-layouts/navbarViewLayout.js';

function init() {
    const components = {
        "logoutIcon": new LogoutIcon()
    }
    const layout = new NavbarViewLayout(components);
    layout.render(document.querySelector("nav"));
}

init();