/**
 * Static class that offers a variety of utility methods for
 * quick element creation purposes.
 */
class Utils {
    constructor() {
        // This constructor prevents instantiation
        throw new Error("This class should not be instantiated");
    }
    /**
    Generates and returns an svg element 
    with given classname, ariaLabel and 
    inner path element d attribute(pathD) 
    */
    static generateSvg(classname, ariaLabel, pathD) {
        const dstSvg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
        const svgTitle = document.createElement("title");

        dstSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        dstSvg.setAttribute("width", "16");
        dstSvg.setAttribute("height", "16");
        dstSvg.setAttribute("fill", "currentColor");
        dstSvg.setAttribute("class", "bi " + classname);
        dstSvg.setAttribute("viewBox", "0 0 16 16");
        dstSvg.setAttribute("aria-label", ariaLabel);
        svgTitle.innerHTML = ariaLabel;

        const pathElement = document.createElementNS("", "path");
        pathElement.setAttribute("d", pathD);
        if (classname === "bi-heart-fill") {
            pathElement.setAttribute("fill-rule", "evenodd");
        }

        dstSvg.appendChild(svgTitle);
        dstSvg.appendChild(pathElement);

        return dstSvg;
    }

    static generateTimeElapsedString(createdAt) {
        const actualDate = new Date();
        const createdAtDate = new Date(createdAt);
        const elapsedMs = actualDate - createdAtDate;
        const elapsedDays = Math.floor(elapsedMs / 86_400_000);
        if (elapsedDays) {
            return elapsedDays + " g";
        }
        const elapsedHours = Math.floor(elapsedMs / 3_600_000);
        if (elapsedHours) {
            return elapsedHours + " h";
        }
        const elapsedMinutes = Math.floor(elapsedMs / 60_000);
        if (elapsedMinutes) {
            return elapsedMinutes + " m";
        }
        const elapsedSeconds = Math.floor(elapsedMs / 1_000);
        if (elapsedSeconds) {
            return elapsedSeconds + " s";
        }
        return "Now";
    }

    static setupAutocomplete(inputElement, dataArray) {
        /*
            The autocomplete method takes two parameters,
            the text field element and an array of possible autocompleted values:
        */
        let currentFocus;
        /*
            Execute when someone writes in the text field:
        */
        inputElement.addEventListener("input", e => {
            const inputElementValue = e.target.value;
            // Close any already open list of autocompleted values
            closeAllLists();
            if (!inputElementValue) {
                return false;
            }
            currentFocus = -1;
            // Create autocomplete items wrapper element
            const autocompleteItemsWrapper = document.createElement("div");
            autocompleteItemsWrapper.id = "autocompleteList" + e.target.id;
            autocompleteItemsWrapper.classList.add('autocomplete-items');
            e.target.parentNode.appendChild(autocompleteItemsWrapper);

            for (const item of dataArray) {
                const autocompletedItem = document.createElement("div");
                if (inputElementValue.length <= item.length && inputElementValue.toUpperCase() == item.substring(0, inputElementValue.length).toUpperCase()) {
                    autocompletedItem.innerHTML = `<strong>${item.substring(0, inputElementValue.length)}</strong>`;
                    autocompletedItem.innerHTML += item.substring(inputElementValue.length);
                    autocompletedItem.innerHTML += `<input type="hidden" value="${item}" />`;
                } else {
                    autocompletedItem.innerHTML += item;
                    autocompletedItem.innerHTML += `<input type="hidden" value="${item}" />`;
                }
                /*
                    Execute when someone clicks on the item value
                */
                autocompletedItem.addEventListener("click", innerEvent => {
                    inputElement.value = item;
                    closeAllLists();
                });
                autocompleteItemsWrapper.appendChild(autocompletedItem);
            }
        });
        /*
            Execute when someone presses a key on the keyboard:
        */
        inputElement.addEventListener("keydown", e => {
            const autocompleteItemsWrapper = document.querySelector("#autocompleteList" + e.target.id);
            if (autocompleteItemsWrapper) {
                const autocompleteItems = autocompleteItemsWrapper.getElementsByTagName("div");
                if (e.keyCode == 40) {
                    console.log("down");
                    // key DOWN
                    currentFocus++;
                    addActive(autocompleteItems);
                } else if (e.keyCode == 38) {
                    console.log("up");
                    /*If the arrow UP key is pressed,
                    decrease the currentFocus variable:*/
                    currentFocus--;
                    /*and and make the current item more visible:*/
                    addActive(autocompleteItems);
                } else if (e.keyCode == 13) {
                    /*If the ENTER key is pressed, prevent the form from being submitted,*/
                    e.preventDefault();
                    if (currentFocus > -1) {
                        /*and simulate a click on the "active" item:*/
                        if (autocompleteItems) autocompleteItems[currentFocus].click();
                    }
                }
            }
        });

        const addActive = autocompleteItems => {
            /*a function to classify an item as "active":*/
            if (!autocompleteItems) return false;
            /*start by removing the "active" class on all items:*/
            removeActive(autocompleteItems);
            if (currentFocus >= autocompleteItems.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = (autocompleteItems.length - 1);
            /*add class "autocomplete-active":*/
            autocompleteItems[currentFocus].classList.add("autocomplete-active");
        }

        const removeActive = autocompleteItems => {
            /*a function to remove the "active" class from all autocomplete items:*/
            for (let i = 0; i < autocompleteItems.length; i++) {
                autocompleteItems[i].classList.remove("autocomplete-active");
            }
        };

        const closeAllLists = element => {
            /*close all autocomplete lists in the document,
            except the one passed as an argument:*/
            const autocompleteItemsWrappers = document.getElementsByClassName("autocomplete-items");
            for (let i = 0; i < autocompleteItemsWrappers.length; i++) {
                if (element != autocompleteItemsWrappers[i] && element != inputElement) {
                    autocompleteItemsWrappers[i].parentNode.removeChild(autocompleteItemsWrappers[i]);
                }
            }
        };
        /*
            Execute when someone clicks in the document:
        */
        document.addEventListener("click", e => {
            closeAllLists(e.target);
        });
    }
}

export { Utils }