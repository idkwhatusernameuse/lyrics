import * as Lyrics from './lyrics.js'
import * as UI from './ui.js'

export function init() {
    // Play pause button
    var play_pause = document.querySelector('.playpause')

    play_pause.onclick = () => {
        window.audio.paused ? Lyrics.resume() : Lyrics.pause()
    }

    // Stop button
    var stop = document.querySelector('.stop')

    stop.onclick = () => {
        UI.switchLyricsDisplay()
    }

    // Hide controls when mouse has not moved for 5 seconds
    var hide_timeout

    window.onpointermove = () => {
        document.querySelector('.controls').style.opacity = 1
        if (hide_timeout !== undefined) clearTimeout(hide_timeout)
        hide_timeout = setTimeout(function() {
            document.querySelector('.controls').style.opacity = 0
        }, 5000)
    }
}