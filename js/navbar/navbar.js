import { LogoutIcon } from './view-components/logoutIcon.js';
import { SearchForm } from './view-components/searchForm.js';
import { NavbarViewLayout } from './view-layouts/navbarViewLayout.js';

function init() {
    const components = {
        "logoutIcon": new LogoutIcon(),
        "searchForm": new SearchForm()
    }
    const layout = new NavbarViewLayout(components);
    layout.render(document.querySelector("nav"));
}

init();