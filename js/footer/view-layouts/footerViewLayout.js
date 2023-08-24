class FooterViewLayout {
    constructor(components) {
        this._components = components;
    }

    render(rootElement) {
        rootElement.innerHTML = this._generate();
    }

    _generate() {
        return `
        <p class="text-light text-center align-middle">&copy; All rights reserved - Leon Baiocchi</p>
        `;
    }
}