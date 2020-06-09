import { parseLyrics, createLyricInHTML } from './lrc_parser.js'
import * as id3 from 'id3js'
import { convertArrayBufferToImage } from './arraybuffer_image.js'
import * as Animation from './animation.js'
import { setColors } from './background.js'
import {MDCRipple} from '@material/ripple';

// Material Components Ripple
MDCRipple.attachTo(document.querySelector('.mdc'));

// Input buttons
var lrc_input = document.getElementById('lrc-input')
var song_input = document.getElementById('song-input')
var lrc_button = document.getElementById('lrc-button')
var song_button = document.getElementById('song-button')

lrc_button.onclick = e => {
    lrc_input.click()
}

song_button.onclick = e => {
    song_input.click()
}

var lyrics

// Once a .lrc file is selected, parse the file
lrc_input.onchange = e => {
    let file = e.target.files[0]
    if (file.name.includes('.lrc')) {
        // Read the file
        let reader = new FileReader();
        reader.readAsText(file,'UTF-8');
        document.querySelector('#lrc-file-text').innerHTML = file.name
        reader.onload = readerEvent => {
            var content = readerEvent.target.result; // this is the content!
            lyrics = parseLyrics(content)
        }
    }
}

var audio

// Once an audio file is selected, get the ID3 tags and cover
song_input.onchange = e => {
    let file = e.target.files[0]
    if (file.name.includes('.mp3' || '.m4a' || '.ogg')) {
        // Get ID3 tags and cover
        id3.fromFile(file).then(data => {
            document.querySelector('#song-file-text').innerHTML = file.name
            let song_data = {
                'title': data.title,
                'artist': data.artist,
                'cover': convertArrayBufferToImage(data.images[0].data) // Convert ArrayBuffer to blob
            }
            // Change background with cover colors
            setColors(song_data.cover)
            // Set song info
            document.querySelector('#cover').src = song_data.cover 
            document.querySelector('#title').innerHTML = song_data.title 
            document.querySelector('#artist').innerHTML = song_data.artist 
            // Change the document title
            document.title = 'Lyrics: ' + song_data.artist + ' - ' + song_data.title
        })
        audio = new Audio(URL.createObjectURL(file))
        // When audio ends, return to the main screen
        audio.onended = () => {
            document.querySelector('.main').style.display = 'block'
            document.querySelector('.lyrics').style.display = 'none'
            document.querySelector('.lyrics').style.transform = 'translateY(0px)'
            document.querySelectorAll('.overlay').forEach(e => { e.style.display = 'none'})
            // Remove all lyric lines from HTML
            document.querySelectorAll('.lyric-line').forEach(e => { e.remove() })
        }
    }
}

// Start button
var start = document.getElementById('start-lyrics')

start.onclick = e => {
    createLyricInHTML(lyrics)
    audio.play()
    document.querySelector('.main').style.display = 'none'
    document.querySelector('.lyrics').style.display = 'inherit'
    document.querySelectorAll('.overlay').forEach(e => { e.style.display = 'flex'})
    Animation.start()
    window.state = true
}

export function changeAudioPosition(seconds) {
    audio.currentTime = seconds
}

Animation.animateBlobs()
setInterval(Animation.animateBlobs, 5000)

// Play pause button
var play_pause = document.querySelector('.playpause')

export function resume() {
    window.state = true
    Animation.resume()
    audio.play()
    document.querySelector('.playpause_icon').innerHTML = 'pause'
}

export function pause() {
    window.state = false
    Animation.pause()
    audio.pause()
    document.querySelector('.playpause_icon').innerHTML = 'play_arrow'
}

play_pause.onclick = e => {
    if (window.state) {
        pause()
    } else {
        resume()
    }
}

// Resume scrolling
var resume_scrolling = document.querySelector('.resume_scrolling')

resume_scrolling.onclick = e => {
    Animation.resumeScrolling()
    resume_scrolling.classList.add('mdc-fab--exited')
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