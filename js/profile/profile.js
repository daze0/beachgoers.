import { ProfileViewLayout } from './view-layouts/profileViewLayout.js';

function init() {
    const components = undefined;

    const layout = new ProfileViewLayout(components);
    
    layout.render(document.querySelector("main"));
}

init();