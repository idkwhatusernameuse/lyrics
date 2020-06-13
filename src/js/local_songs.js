import { parseLyrics, createLyricInHTML } from './lrc_parser.js'
import * as id3 from 'id3js'
import { convertArrayBufferToImage } from './arraybuffer_image.js'
import * as Lyrics from './lyrics.js'
import * as Background from './background.js'


export function init() {
    // Input buttons
    let lrc_input = document.getElementById('lrc-input')
    let song_input = document.getElementById('song-input')
    let lrc_button = document.getElementById('lrc-button')
    let song_button = document.getElementById('song-button')

    lrc_button.onclick = () => {
        lrc_input.click()
    }

    song_button.onclick = () => {
        song_input.click()
    }

    let lyrics

    // Once a .lrc file is selected, parse the file
    lrc_input.onchange = e => {
        let file = e.target.files[0]
        if (file.name.includes('.lrc')) {
            // Read the file
            let reader = new FileReader();
            reader.readAsText(file,'UTF-8');
            document.querySelector('#lrc-file-text').innerHTML = file.name
            reader.onload = readerEvent => {
                let content = readerEvent.target.result; // this is the content!
                lyrics = parseLyrics(content)
            }
        }
    }

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
                Background.setColors(song_data.cover)
                // Set song info
                document.querySelector('#cover').src = song_data.cover 
                document.querySelector('#title').innerHTML = song_data.title 
                document.querySelector('#artist').innerHTML = song_data.artist 
                // Change the document title
                document.title = 'Lyrics: ' + song_data.artist + ' - ' + song_data.title
            })
            window.audio = new Audio(URL.createObjectURL(file))
            // When audio ends, return to the main screen
            window.audio.onended = () => {
                document.querySelector('.song-info').style.visibility = 'hidden'
                document.querySelector('.controls').style.visibility = 'hidden'
                document.querySelector('.lyrics').style.display = 'none'
                document.querySelector('.main').style.display = 'block'
                // Remove all lyric lines from HTML
                document.querySelectorAll('.lyric-line').forEach(e => { e.remove() })
            }
        }
    }

    // Start button
    let start = document.getElementById('start-lyrics')

    start.onclick = () => {
        createLyricInHTML(lyrics)
        document.querySelector('.main').style.display = 'none'
        document.querySelector('.lyrics').style.display = 'inherit'
        document.querySelector('.song-info').style.visibility = 'visible'
        document.querySelector('.controls').style.visibility = 'visible'
        Lyrics.start()
        window.state = true
    }
}