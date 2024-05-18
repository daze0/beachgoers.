class FooterViewLayout {
    render(rootElement) {
        rootElement.innerHTML = this.#generate();
    }

    #generate() {
        return `
        <p class="text-center align-middle">&copy; All rights reserved - Alma Pandolfi & Leon Baiocchi</p>
        `;
    }
}

export { FooterViewLayout };