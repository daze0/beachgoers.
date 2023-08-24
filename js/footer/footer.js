function init() {
    // Index page has no particular components to note
    const components = null;

    const layout = new FooterViewLayout(components);
    layout.render(document.querySelector("footer"));
}

init();