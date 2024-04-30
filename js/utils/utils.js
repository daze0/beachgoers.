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

    static generateTimeElapsedString(createdAt){
        const actualDate = new Date();
        const createdAtDate = new Date(createdAt);
        const elapsedMs = actualDate - createdAtDate;
        const elapsedDays =  Math.floor(elapsedMs / 86_400_000);
        if(elapsedDays){
            return elapsedDays+" g";
        }
        const elapsedHours = Math.floor(elapsedMs / 3_600_000);
        if(elapsedHours){
            return elapsedHours+" h";
        }
        const elapsedMinutes = Math.floor(elapsedMs / 60_000);
        if(elapsedMinutes){
            return elapsedMinutes+" m";
        }
        const elapsedSeconds = Math.floor(elapsedMs / 1_000);
        if(elapsedSeconds){
            return elapsedSeconds+" s";
        }
        return "";
    }
}

export { Utils }