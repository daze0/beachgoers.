import { FooterViewLayout } from './view-layouts/footerViewLayout.js';

function init() {
    const layout = new FooterViewLayout();
    layout.render(document.querySelector("footer"));
}

init();