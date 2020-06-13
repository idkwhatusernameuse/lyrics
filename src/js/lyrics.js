import * as Control from './controls.js'

var position, lyric_lines, timeout, newPosition, is_lyric_scrolling, auto_scroll, time, current_active_line
var resume_scrolling = document.querySelector('.resume_scrolling')
var controls = document.querySelector('.controls')

// Start the animation from scratch
export function start() {
    window.audio.play()
    Control.init()
    auto_scroll = true // Enable automattic scrolling
    position = 0
    current_active_line = 0
    lyric_lines = document.querySelectorAll('.lyric-line')
    let temp_time = lyric_lines[0].dataset.timestamp * 1000
    setTimeout(goToLine, temp_time)
}

// Sort of resuming the lyrics, only if paused
// only_scrolling: Resume only the lyrics scrolling. True when clicking/pressing a line or the "Resume scrolling" FAB
export function resume(only_scrolling) {
    if (position > 0) position--
    if (only_scrolling === true) {
        auto_scroll = true
        goToLine({ index: position, with_audio: false })
    } else {
        document.querySelector('.playpause_icon').innerHTML = 'pause'
        window.audio.play()
        goToLine({ index: position, with_audio: true })
    }
}

// Pause the animation
// only_scrolling: Pause only the lyrics scrolling. True when user scrolls through lyrics
export function pause(only_scrolling) {
    if (only_scrolling === true) {
        auto_scroll = false
        document.querySelectorAll('.inactive').forEach(e => { e.classList.remove('inactive') })
        resume_scrolling.classList.remove('mdc-fab--exited')
        controls.classList.remove('hidden-lines-fab')
    } else {
        window.audio.pause()
        document.querySelector('.playpause_icon').innerHTML = 'play_arrow'
        clearTimeout(timeout)
    }
}

// Stop completely
export function stop() {
    clearTimeout(timeout)
}

// Animate the active line. Should be running only while the song is playing.
function setActiveLine() {
    lyric_lines[position].classList.add('active')
    // If the previous line isn't the same as the current line, then don't remove the class
    if (!(position === current_active_line)) lyric_lines[current_active_line].classList.remove('active')
    // If the lyrics are automatically scrolling, then don't blur the text
    if (auto_scroll) lyric_lines[current_active_line].classList.add('inactive')
    current_active_line = position
}

// Animate scrolling to the next line. Should be running only when auto_scroll is true.
export function scrollToActiveLine() {
    resume_scrolling.classList.add('mdc-fab--exited')
    controls.classList.add('hidden-lines-fab')
    lyric_lines.forEach(e => { e.classList.add('inactive') })
    // Calculate how far is the next element from the top of the document
    let rect = lyric_lines[position].getBoundingClientRect()
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop
    let topPadding = document.body.className === 'largeUI' ? 0.37 : 0.17
    newPosition = rect.top + scrollTop - (window.innerHeight * topPadding)
    // Scroll
    window.scrollTo(0, newPosition)
}

// Animate the scrolling to a certain line.
export function goToLine(options) {
    clearTimeout(timeout)
    is_lyric_scrolling = true
    if (options !== undefined) {
        // If an index is provided, replace position with it
        if (options.index !== undefined) position = options.index
        // Change audio position
        if (options.with_audio === true) {
            window.audio.currentTime = lyric_lines[position].dataset.timestamp
            auto_scroll = true
        }
    }
    // Animation
    if (auto_scroll === true) scrollToActiveLine()
    setActiveLine()
    // Calculate the time for the next line
    let next_time = 0
    try {
        next_time = lyric_lines[position + 1].dataset.timestamp
    } catch { }
    time = (next_time - lyric_lines[position].dataset.timestamp)
    // Wait until next line comes...
    position++
    timeout = setTimeout(goToLine, time * 1000)
}

// When user scrolls, pause the automatic scrolling.
window.onscroll = detectScrolling
window.ontouchmove = detectScrolling

function detectScrolling() {
    if (window.audio.paused === false) {
        // If lyrics are scrolling, don't detect for user scroll
        if (is_lyric_scrolling && auto_scroll) {
            if (Math.round(newPosition) < window.scrollY) {
                is_lyric_scrolling = true
            } else if (Math.round(newPosition) === window.scrollY) {
                is_lyric_scrolling = false
            }
        } else { // Lyrics aren't scrolling, if user scrolls, stop the lyrics scrolling
            pause(true)
        }
    }
}

// Resume scrolling
var resume_scrolling = document.querySelector('.resume_scrolling')

resume_scrolling.onclick = e => {
    resume(true)
}