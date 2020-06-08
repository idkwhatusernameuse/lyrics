import { parseLyrics, createLyricInHTML } from './lrc_parser.js'
import * as id3 from 'id3js'
import { convertArrayBufferToImage } from './arraybuffer_image.js'
import * as Animation from './animation.js'
import { setColors } from './background.js'

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
            // Change the document title
            document.title = 'Lyrics: ' + song_data.artist + ' - ' + song_data.title
        })
        audio = new Audio(URL.createObjectURL(file))
        // When audio ends, return to the main screen
        audio.onended = () => {
            document.querySelector('.home-content').style.display = 'block'
            document.querySelector('.lyrics').style.display = 'none'
            document.querySelector('.lyrics').style.transform = 'translateY(0px)'
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
    document.querySelector('.home-content').style.display = 'none'
    document.querySelector('.lyrics').style.display = 'block'
    Animation.start()
}

export function changeAudioPosition(seconds) {
    audio.currentTime = seconds
}
Animation.animateBlobs()
setInterval(Animation.animateBlobs, 5000)