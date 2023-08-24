function init() {
    // Index page has no particular components to note
    const components = null;

    const layout = new IndexViewLayout(components);
    layout.render(document.querySelector("main"));
}

init();