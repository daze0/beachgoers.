class FooterViewLayout {
    render(rootElement) {
        rootElement.innerHTML = this.#generate();
    }

    #generate() {
        return `
        <p class="text-light text-center align-middle">&copy; All rights reserved - Leon Baiocchi</p>
        `;
    }
}

export { FooterViewLayout };