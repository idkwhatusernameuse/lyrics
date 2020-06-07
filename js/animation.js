var position = 0;
var lyric_elements; 

export function start() {
    lyric_elements = document.querySelectorAll('.lyric-line')
    setTimeout(scroll, lyric_elements[position].dataset.timestamp * 1000)
}

var timeout;

function scroll() {
    try {
        lyric_elements[position - 1].className = 'lyric-line'
    } catch (e) { }
    // Current lyric
    let element = lyric_elements[position]
    // Make it the active one
    element.className = 'lyric-line active'
    // Scroll the page to the current line
    let rect = element.getBoundingClientRect()
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    window.scrollTo(0, rect.top + scrollTop - (window.innerHeight * 0.30))
    // Next lyric please
    position++
    // Wait for next line
    let time = parseFloat(lyric_elements[position].dataset.timestamp) - parseFloat(lyric_elements[position - 1].dataset.timestamp)
    timeout = setTimeout(scroll, time * 1000);
};

export function changePosition(index) {
    // Clear the active state for all elements. This is inefficient so it should be changed.
    for (let i = 0; i < lyric_elements.length; i++) {
        lyric_elements[i].className = 'lyric-line'
    }
    console.log(timeout)
    clearTimeout(timeout)
    position = index;
    scroll()
}