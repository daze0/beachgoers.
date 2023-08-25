<?php 
/**
 * Class of reference for every web page.
 */
class WebPage {
    private $templateParams;

    /**
     *  Basic web page parameters:
     * title -> web page title
     * css   -> css files to include in the web page
     * js    -> js files to include in the web page
     */ 
    public function __construct($title, $css, $js, $jsm) {
        $this->templateParams["title"] = $title;
        $this->templateParams["css"] = $css;
        $this->templateParams["js"] = $js;
        $this->templateParams["jsm"] = $jsm;
    }

    /**
     * Setter and getter for a generic template parameter.
     * 
     * TODO(?): check if key is a string.
     */
    public function setParam($key, $value) {
        $this->templateParams[$key] = $value;
    }

    public function getParam($key) {
        return $this->templateParams[$key];
    }

    /**
     * Setters and getters for base template parameters.
     */
    public function setTitle($title) {
        $this->templateParams["title"] = $title;
    }

    public function setCss($css) {
        $this->templateParams["css"] = $css;
    }

    public function setJs($js) {
        $this->templateParams["js"] = $js;
    }

    public function setJsm($jsm) {
        $this->templateParams["jsm"] = $jsm;
    }

    public function getTitle() {
        return $this->templateParams["title"];
    }

    public function getCss() {
        return $this->templateParams["css"];
    }

    public function getJs() {
        return $this->templateParams["js"];
    }

    public function getJsm() {
        return $this->templateParams["jsm"];
    }
}

?>