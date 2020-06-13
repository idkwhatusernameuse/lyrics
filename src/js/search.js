import * as NetEase from './163.js'
import {MDCList} from '@material/list';

let progress_bar

export function init() { 
    progress_bar = document.querySelector('.mdc-linear-progress')
    document.querySelector('.search-icon').onclick = e => {
        progress_bar.style.display = 'unset'
        document.querySelectorAll('search-result').forEach(element => element.remove())
        NetEase.search(document.querySelector('.song-keywords').value)
        .then(results => {
            progress_bar.style.display = 'none'
            results.forEach(song => {
                var instance = document.createElement('search-result')
                instance.setAttribute('title', song.title)
                instance.setAttribute('artist', song.artist)
                //instance.setAttribute('cover', song.cover)
                MDCList.attachTo(instance)
                document.querySelector('.mdc-list').appendChild(instance)
            });
        })
    }
    
}   