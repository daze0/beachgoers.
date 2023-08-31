import { FeedViewLayout } from './view-layouts/feedViewLayout.js';

function init() {
    const components = undefined;

    const layout = new FeedViewLayout(components);
    
    layout.render(document.querySelector("main"));
}

init();