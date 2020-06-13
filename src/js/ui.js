import { createLyricInHTML } from './lrc_parser.js'
import * as Lyrics from './lyrics.js'
import * as Background from './background.js'
import * as UI from './ui.js'

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

var lyrics

export function switchLyricsDisplay(show_lyrics) {
    let visibility = !show_lyrics
    if (visibility === true) {
        // Remove all lyric lines from HTML
        document.querySelectorAll('.lyric-line').forEach(e => { e.remove() })
        document.title = 'Lyrics'
    } else {
        // When audio ends, return to the main screen
        window.audio.onended = () => {
            UI.switchLyricsDisplay()
        }
        createLyricInHTML(lyrics)
        Lyrics.start()
    }
    document.querySelector('.song-info').style.visibility = visibility === false ? 'visible' : 'hidden'
    document.querySelector('.controls').style.visibility = visibility === false ? 'visible' : 'hidden'
    document.querySelector('.lyrics').style.display = visibility === false ? 'inherit' : 'none'
    document.querySelector('.main').style.display = visibility === false ? 'none' : 'inherit'
    visibility = visibility ? false : true
}

export function setSongDetails(song_data) {
    document.querySelector('#cover').src = song_data.cover 
    document.querySelector('#title').innerHTML = song_data.title 
    document.querySelector('#artist').innerHTML = song_data.artist
    window.audio = new Audio(song_data.audio)
    document.title = 'Lyrics: ' + song_data.artist.replace('\u0000', '') + ' - ' + song_data.title.replace('\u0000', '')
    // Change background with cover colors
    Background.setColors(song_data.cover)
    lyrics = song_data.lyrics
    document.querySelector('.start-lyrics').style.display = 'inherit'
}