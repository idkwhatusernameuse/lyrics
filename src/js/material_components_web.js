import {MDCTabBar} from '@material/tab-bar';
import {MDCTextField} from '@material/textfield';
import {MDCTextFieldIcon} from '@material/textfield/icon';
import {MDCLinearProgress} from '@material/linear-progress';
import {MDCRipple} from '@material/ripple';
import {MDCList} from '@material/list';

export function init() {
    document.querySelectorAll('.mdc').forEach(element => MDCRipple.attachTo(element))
    document.querySelectorAll('.mdc-text-field').forEach(element => MDCTextField.attachTo(element))
    document.querySelectorAll('.mdc-text-field-icon').forEach(element => MDCTextFieldIcon.attachTo(element))
    document.querySelectorAll('.mdc-linear-progress').forEach(element => MDCLinearProgress.attachTo(element))
    
    // Tab Bar
    const tabBar = new MDCTabBar(document.querySelector('.mdc-tab-bar'));
    tabBar.activateTab(1)

    document.querySelector('.local-song-tab').onclick = () => {
        document.querySelector('.main').classList.remove("fill-screen")
        document.querySelector('.local-song').style.display = "inherit"
        document.querySelector('.search').style.display = "none"
    }
    
    document.querySelector('.search-tab').onclick = () => {
        document.querySelector('.main').classList.add("fill-screen")
        document.querySelector('.local-song').style.display = "none"
        document.querySelector('.search').style.display = "grid"
    }
}
