class SearchResult extends HTMLElement {
    constructor() {
        super()
    }
    
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