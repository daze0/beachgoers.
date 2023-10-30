/**
 * Static class that offers a variety of utility methods for
 * quick element creation purposes.
 */
class Utils {
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
}

export {Utils}