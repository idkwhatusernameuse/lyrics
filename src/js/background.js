import * as Vibrant from 'node-vibrant'

export function setColors(image) {
    Vibrant.from(image).getPalette(function(err, palette) {
        document.body.style.background = palette.DarkVibrant.getHex()
        console.log(palette)
        document.querySelector('.blob1').childNodes[1].setAttribute('fill', palette.Vibrant.getHex())
        document.querySelector('.blob2').childNodes[1].setAttribute('fill', palette.DarkMuted.getHex())
        document.querySelector('.blob3').childNodes[1].setAttribute('fill', palette.Vibrant.getHex())
        document.querySelector('.blob4').childNodes[1].setAttribute('fill', palette.Muted.getHex())
    })
}