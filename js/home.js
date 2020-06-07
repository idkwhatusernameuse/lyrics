import { parseLyrics, createLyricInHTML } from './lrc_parser.js'
import * as id3 from 'id3js'
import { convertArrayBufferToImage } from './arraybuffer_image.js'
import * as Animation from './animation.js'

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

lrc_input.onchange = e => {
    let file = e.target.files[0]
    if (file.name.includes('.lrc')) {
        // Read the file
        let reader = new FileReader();
        reader.readAsText(file,'UTF-8');
        reader.onload = readerEvent => {
            var content = readerEvent.target.result; // this is the content!
            var lyrics = parseLyrics(content)
            createLyricInHTML(lyrics)
        }
    }
}
var audio

song_input.onchange = e => {
    let file = e.target.files[0]
    if (file.name.includes('.mp3' || '.m4a' || '.ogg')) {
        id3.fromFile(file).then(data => {
            let song_data = {
                'title': data.title,
                'artist': data.artist,
                'cover': convertArrayBufferToImage(data.images[0].data)
            }
            //document.getElementById('cover').src = shit.cover
        })
        audio = new Audio(URL.createObjectURL(file))
    }
}

// Start button
var start = document.getElementById('start-lyrics')

start.onclick = e => {
    //audio.play()
    document.querySelector('.home-content').style.display = 'none'
    Animation.start()
}