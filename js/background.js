import * as Vibrant from 'node-vibrant'

export function setColors(image) {
    Vibrant.from(image).getPalette(function(err, palette) {
        document.body.style.background = palette.DarkMuted.getHex()
        document.querySelector('#blob1').childNodes[1].setAttribute('fill', palette.DarkVibrant.getHex())
        document.querySelector('#blob2').childNodes[1].setAttribute('fill', palette.LightMuted.getHex())
        document.querySelector('#blob3').childNodes[1].setAttribute('fill', palette.LightVibrant.getHex())
        document.querySelector('#blob4').childNodes[1].setAttribute('fill', palette.Muted.getHex())
    })
}