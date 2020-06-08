import { changePosition } from './animation.js'
import { changeAudioPosition } from './home.js'

export function parseLyrics(lrc) {
    let lines = lrc.match(/[^\r\n]+/g) // https://stackoverflow.com/a/5035058
    let lyrics = []
    for (let i = 0; i < lines.length; i++) {
        let minute = lines[i].substring(1,3)
        let second = lines[i].substring(4,6)
        let millisecond = lines[i].substring(7,9)
        let line = lines[i].substring(10)
        if (line !== '') {
            lyrics.push({
                'timestamp': (parseInt(minute) * 60) + parseInt(second) + (parseFloat(millisecond) / 100),
                'text': line
            })
        }
    }
    return lyrics
}

export function createLyricInHTML(lyrics) {
    let section = document.querySelector('.lyrics')
    for (let i = 0; i < lyrics.length; i++) {
        let element = document.createElement('p')
        element.className = 'lyric-line'
        element.innerHTML = lyrics[i].text
        element.dataset.timestamp = lyrics[i].timestamp
        element.onclick = e => {
            changePosition(i)
            changeAudioPosition(element.dataset.timestamp)
        }
        section.appendChild(element)
    }
}