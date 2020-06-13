export function isSmallScreen() {
    // 1404 x 1080 and equivalent
    return (window.innerWidth / window.innerHeight) < 1.5 ? true : false
}
// Check if screen has a larger screen horizontally.
export function applyUIforLargerScreens() {
    if (isSmallScreen() === true) {
        document.body.className = 'smallUI'
    } else {
        document.body.className = 'largeUI'
    }
}

window.onresize = () => {
    applyUIforLargerScreens()
}

class SearchResult extends HTMLElement {
    render() {
        //this.innerHTML = "<li class=\"mdc-list-item\" tabindex=\"0\"><img class=\"item-cover\"><span class=\"mdc-list-item__text\"><span class=\"mdc-list-item__primary-text item-title\">Title</span><span class=\"mdc-list-item__secondary-text item-artist\">Artist</span></span></li>"
        this.innerHTML = "<li class=\"mdc-list-item\" tabindex=\"0\"><span class=\"mdc-list-item__text\"><span class=\"mdc-list-item__primary-text item-title\">Title</span><span class=\"mdc-list-item__secondary-text item-artist\">Artist</span></span></li>"
        this.querySelector('.item-title').innerHTML = this.getAttribute('title')
        this.querySelector('.item-artist').innerHTML = this.getAttribute('artist')
        //this.querySelector('.item-cover').setAttribute('src', this.getAttribute('cover'))
    }

    static get observedAttributes() {
        return [cover, title, artist]
    }

    connectedCallback() { // (2)
        if (!this.rendered) {
            this.render();
            this.rendered = true;
        }
    }

    attributeChangedCallback(name, oldValue, newValue) { // (4)
        this.render();
    }
}

export function declareTemplates() {
    customElements.define("search-result", SearchResult)
}