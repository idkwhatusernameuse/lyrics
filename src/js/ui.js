import { resumeScrolling, scrollActiveLine } from './animation.js'

export function isSmallScreen() {
    // 1404 x 1080 and equivalent
    return (window.innerWidth / window.innerHeight) < 1.5 ? true : false
}
// Check if screen has a larger screen horizontally.
export function applyUIforLargerScreens() {
    if (isSmallScreen() === true) {
        document.body.className = 'smallUI'
    } else {
        document.body.className = 'largeUI'
    }
}

window.onresize = () => {
    applyUIforLargerScreens()
    resumeScrolling()
}