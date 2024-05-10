import { Listener } from "../../utils/listener.js";
import { Utils } from "../../utils/utils.js";

class SearchForm {
    _form;
    _listeners;

    constructor() {
        this._form = document.createElement("form");
        this.searchCallback = this.searchCallback.bind(this);
        this._listeners = {
            "searchFormSubmit": new Listener("#searchForm", "submit", this.searchCallback)
        };
    }

    generateComponent(data = undefined) {
        this._form.action = "#";
        this._form.id = "searchForm";
        this._form.method = "get";
        this._form.autocomplete = "off";
        this._form.classList.add("form-inline");
        this._form.innerHTML = this.#generateSearchForm();

        document.addEventListener("DOMContentLoaded", e => {
            console.log(document.querySelector("#searchForm input[type='search']"));
            Utils.setupAutocomplete(document.querySelector("#searchForm input[type='search']"));
        });

        return this._form;
    }

    #generateSearchForm() {
        return `
            <div class="input-group">
                <input class="form-control" name="query" type="search" placeholder="Search by username" aria-label="Search">
                <div class="input-group-append">
                    <button class="btn btn-outline-dark" type="submit">
                        <i class="bi bi-search"></i>
                    </button>
                </div>
            </div>
        `;
    }

    searchCallback() {
        const searchInput = document.querySelector("form#searchForm input");
        axios.get(`api/api-search.php?q=${searchInput.value}`).then(response => {
            if (response.data["search_success"]) {
                window.location.href = `profile.php?uid=${response.data["result_uid"]}`;
            } else {
                searchInput.classList.add('text-danger', 'form-input-disabled');
                searchInput.value = "Incorrect username";
                setTimeout(() => {
                    searchInput.classList.add('form-input-fade-out');
                }, 1500);
                setTimeout(() => {
                    searchInput.classList.remove('text-danger', 'form-input-disabled', 'form-input-fade-out');
                    searchInput.value = "";
                    searchInput.classList.add('form-input-fade-in');
                }, 2250);
                searchInput.classList.remove('form-input-fade-in');
            }
        }).catch(error => {
            throw new Error("Error during search request: ", error);
        })
    }

    getListener(label) {
        return this._listeners[label];
    }

    attachListeners() {
        const listeners = Object.values(this._listeners);
        listeners.forEach(listener => listener.attachListener());
    }

    detachListeners() {
        const listeners = Object.values(this._listeners);
        listeners.forEach(listener => listener.detachListener());
    }
}

export { SearchForm };