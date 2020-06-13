import * as NetEase from './163.js'
import * as UI from './ui.js'
import { parseLyrics } from './lrc_parser.js'

export function load(song) {
    let progress_bar = document.querySelector('.loading-progress')
    let search = document.querySelector('.search')
    let loading = document.querySelector('.loading')
    let text = document.querySelector('.loading-text')
    progress_bar.style.display = 'inherit'
    search.style.display = 'none'
    loading.style.display = 'inherit'
    text.innerHTML = "Loading " + song.artist + ' - ' + song.title

    NetEase.getSong(song)
    .then(data => {
        let newData = data
        newData.lyrics = parseLyrics(data.lyrics)
        UI.setSongDetails(newData)
        progress_bar.style.display = 'none'
        text.innerHTML = song.artist + ' - ' + song.title
        document.querySelector('.start-lyrics').onclick = () => {
            UI.switchLyricsDisplay(true)
        }
    })
    .catch(() => {
        let go_back = document.querySelector('.go-back')
        go_back.style.display = 'inherit'
        go_back.onclick = () => {
            search.style.display = 'grid'
            loading.style.display = 'none'
            go_back.style.display = 'none'
        }
        progress_bar.style.display = 'none'
            text.innerHTML = "There was an error trying to load the song (could be that there wasn't lyrics or an audio file for this song)"
    })
}