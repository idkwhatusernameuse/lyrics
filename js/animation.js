var position = 0
var lyric_elements
var timeout
var current_scroll = 0
var newPosition
var is_lyric_scrolling
var free_scroll

export function start() {
    // Reset all values
    is_lyric_scrolling = false
    free_scroll = false
    position = 0
    current_scroll = 0
    lyric_elements = document.querySelectorAll('.lyric-line')
    resume()
}

export function resume() {
    timeout = setTimeout(nextLine, lyric_elements[0].dataset.timestamp * 1000)
}

export function pause() {
    clearTimeout(timeout)
}

function nextLine() {
    is_lyric_scrolling = true
    highlightNextLine()
    if (!free_scroll) scrollNextLine()
    position++
    let time = parseFloat(lyric_elements[position].dataset.timestamp) - parseFloat(lyric_elements[position - 1].dataset.timestamp)
    timeout = setTimeout(nextLine, time * 1000)
}

function highlightNextLine() {
    // Make any other line inactive
    try {
        lyric_elements[position - 1].className = 'lyric-line'
    } catch (e) { }
    // Make it the active one
    lyric_elements[position].className = 'lyric-line active'
}

function scrollNextLine() {
    // Calculate how far is the next element from the top of the document
    let rect = lyric_elements[position].getBoundingClientRect()
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    newPosition = rect.top + scrollTop - (window.innerHeight * 0.20)
    // Scroll
    window.scrollTo(0, newPosition)
};

// This function changes the active lyric
export function changePosition(index) {
    is_lyric_scrolling = true
    free_scroll = false
    // Clear the active state for all elements. This is inefficient so it should be changed.
    for (let i = 0; i < lyric_elements.length; i++) {
        lyric_elements[i].className = 'lyric-line'
    }
    clearTimeout(timeout)
    position = index
    nextLine()
}

// Animate background blobs
export function animateBlobs() {
    let numberX = getRandomInt(0, 100)
    let numberY = getRandomInt(-100, 0)
    document.querySelector('#blob1').style.transform = 'translateX(' + numberX + 'vw) translateY(' + numberY + 'vh)'
    numberX = getRandomInt(-100, 0)
    numberY = getRandomInt(-200, -100)
    document.querySelector('#blob2').style.transform = 'translateX(' + numberX + 'vw) translateY(' + numberY + 'vh)'
    numberX = getRandomInt(0, 100)
    numberY = getRandomInt(-200, -300)
    document.querySelector('#blob3').style.transform = 'translateX(' + numberX + 'vw) translateY(' + numberY + 'vh)'
    numberX = getRandomInt(-100, 0)
    numberY = getRandomInt(-200, -300)
    document.querySelector('#blob4').style.transform = 'translateX(' + numberX + 'vw) translateY(' + numberY + 'vh)'
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.onscroll = e => {
    // If lyrics are scrolling, don't detect for user scroll
    if (is_lyric_scrolling && !free_scroll) {
        if (Math.round(newPosition) < window.scrollY) {
            is_lyric_scrolling = true
        } else if (Math.round(newPosition) === window.scrollY) {
            is_lyric_scrolling = false
        }
    } else { // Lyrics aren't scrolling, if user scrolls, stop the lyrics scrolling
        free_scroll = true
    }
}