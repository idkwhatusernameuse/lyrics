import * as Vibrant from 'node-vibrant'

export function setColors(image) {
    Vibrant.from(image).getPalette(function(err, palette) {
        document.body.style.background = palette.DarkVibrant.getHex()
        document.querySelector('#blob1').setAttribute('fill', palette.Vibrant.getHex())
        document.querySelector('#blob2').setAttribute('fill', palette.DarkMuted.getHex())
        document.querySelector('#blob3').setAttribute('fill', palette.Vibrant.getHex())
        document.querySelector('#blob4').setAttribute('fill', palette.Muted.getHex())
    })
}

// Random numbers for animateBackground()
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Animate background blobs. Should be running at all times!
export function animate() {
    let numberX = getRandomInt(-100, 100)
    let numberY = getRandomInt(-180, 50)
    document.querySelector('.blob1').style.transform = 'translateX(' + numberX + 'vw) translateY(' + numberY + 'vh)'
    numberX = getRandomInt(-100, 100)
    numberY = getRandomInt(-350, -150)
    document.querySelector('.blob2').style.transform = 'translateX(' + numberX + 'vw) translateY(' + numberY + 'vh)'
    numberX = getRandomInt(-100, 100)
    numberY = getRandomInt(-580, -370)
    document.querySelector('.blob3').style.transform = 'translateX(' + numberX + 'vw) translateY(' + numberY + 'vh)'
    numberX = getRandomInt(-100, 100)
    numberY = getRandomInt(-600, -400)
    document.querySelector('.blob4').style.transform = 'translateX(' + numberX + 'vw) translateY(' + numberY + 'vh)'
}