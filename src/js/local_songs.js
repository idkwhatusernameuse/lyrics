import { parseLyrics } from './lrc_parser.js'
import * as id3 from 'id3js'
import { convertArrayBufferToImage } from './arraybuffer_image.js'
import * as UI from './ui.js'

export function init() {
    let song_input = document.getElementById('song-input')
    let lrc_input = document.getElementById('lrc-input')

    // Lyrics button
    document.getElementById('lrc-button').onclick = () => {
        lrc_input.click()
    }

    // Song button
    document.getElementById('song-button').onclick = () => {
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
                lyrics = parseLyrics(readerEvent.target.result)
                checkUndefined(lyrics, data, file)
            }
        }
    }

    let data
    let file
    
    // Once an audio file is selected, get the ID3 tags and cover
    song_input.onchange = e => {
        file = e.target.files[0]
        if (file.name.includes('.mp3' || '.wav' || '.ogg')) {
            // Get ID3 tags and cover
            id3.fromFile(file).then(result => {
                document.querySelector('#song-file-text').innerHTML = file.name
                data = result
                checkUndefined(lyrics, data, file)
            })         
        }
    }

    // Start button
    document.querySelector('.start-lyrics').onclick = () => {
        UI.switchLyricsDisplay(true)
    }
}

function checkUndefined(lyrics, data, file) {
    if (lyrics !== undefined && data !== undefined && file !== undefined) {
        UI.setSongDetails({
            'title': data.title,
            'artist': data.artist,
            'cover': convertArrayBufferToImage(data.images[0].data), // Convert ArrayBuffer to blob,
            'audio': URL.createObjectURL(file),
            'lyrics': lyrics
        })
        document.querySelector('.start-lyrics').style.display = 'inherit'
    }
}