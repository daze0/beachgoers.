import { IndexViewLayout } from './view-layouts/indexViewLayout.js';

function init() {
    const layout = new IndexViewLayout();
    layout.render(document.querySelector("main"));
}

init();