import * as Vibrant from 'node-vibrant'

export function setColors(image) {
    Vibrant.from(image).getPalette(function(err, palette) {
        document.body.style.background = palette.DarkVibrant.getHex()
        console.log(palette)
        document.querySelector('#blob1').setAttribute('fill', palette.Vibrant.getHex())
        document.querySelector('#blob2').setAttribute('fill', palette.DarkMuted.getHex())
        document.querySelector('#blob3').setAttribute('fill', palette.Vibrant.getHex())
        document.querySelector('#blob4').setAttribute('fill', palette.Muted.getHex())
    })
}