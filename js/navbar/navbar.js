import { NavbarViewLayout } from './view-layouts/navbarViewLayout.js';

function init() {
    const layout = new NavbarViewLayout();
    layout.render(document.querySelector("nav"));
}

init();