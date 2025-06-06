// create a library, when you hover a mouse on an element it print the css selector of the element that is unique
// it should be injectable on any webpage
// it should expose two method generateSelectors: starts listening and generating selectors
// stop: stop generating and listening to selectors

const space = ' ';

class CssSelector {
  static init() {
    CssSelector.selectors = [];
    CssSelector.document = window.document;
    CssSelector.handler = null;
  }

  static isUnique(selector) {
    return CssSelector.document.querySelectorAll(selector).length === 1;
  }

  static createSelectorString(element, suffix) {
    if(!element){
        return '';
    }
    if (element.id) {
      return `#${element.id}` + suffix; // id is unique
    } else {
      const classList = [...(element.classList ?? [])];
      const tag = element?.tagName?.toLowerCase();
      const classSelector = classList.map((ele) => `.${ele}`).join();
      if (classSelector && CssSelector.isUnique(classSelector + suffix)) {
        return classSelector + suffix;
      } else if (CssSelector.isUnique(tag + classSelector + suffix)) {
        return tag + classSelector + suffix;
      } else {
        return CssSelector.createSelectorString(
          element.parentElement,
          space + tag + classSelector + suffix
        );
      }
    }
  }

  static onMouseEnter(e) {
    const element = e.target;
    console.log(CssSelector.createSelectorString(element, ""));
  }

  static generateSelectors() {
    CssSelector.document.addEventListener(
      "mouseover",
      CssSelector.onMouseEnter
    );
  }

  static stop() {
    CssSelector.document.removeEventListener(
      "mouseover",
      CssSelector.onMouseEnter
    );
  }
}

CssSelector.init();
CssSelector.generateSelectors();
