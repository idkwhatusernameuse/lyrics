import {MDCTabBar} from '@material/tab-bar';
import {MDCTextField} from '@material/textfield';
import {MDCTextFieldIcon} from '@material/textfield/icon';
import {MDCLinearProgress} from '@material/linear-progress';
import {MDCRipple} from '@material/ripple';
import * as LocalSongs from './local_songs.js'
import * as Search from './search.js'

export function init() {
    document.querySelectorAll('.mdc').forEach(element => MDCRipple.attachTo(element))
    document.querySelectorAll('.mdc-text-field').forEach(element => MDCTextField.attachTo(element))
    document.querySelectorAll('.mdc-text-field-icon').forEach(element => MDCTextFieldIcon.attachTo(element))
    document.querySelectorAll('.mdc-linear-progress').forEach(element => MDCLinearProgress.attachTo(element))
    
    // Tab Bar
    MDCTabBar.attachTo(document.querySelector('.mdc-tab-bar'));

    document.querySelector('.local-song-tab').onclick = () => {
        document.querySelector('.start-lyrics').style.display = 'none'
        document.querySelector('.main').classList.remove("fill-screen")
        document.querySelector('.local-song').style.display = "inherit"
        document.querySelector('.search').style.display = "none"
        document.querySelector('.loading').style.display = "none"
        LocalSongs.init()
    }
    
    document.querySelector('.search-tab').onclick = () => {
        document.querySelector('.loading').style.display = "none"
        document.querySelector('.start-lyrics').style.display = 'none'
        document.querySelector('.main').classList.add("fill-screen")
        document.querySelector('.local-song').style.display = "none"
        document.querySelector('.search').style.display = "grid"
        Search.init()
    }
}
