var position = 0;
var lyric_elements; 

export function start() {
    lyric_elements = document.querySelectorAll('.lyric-line')
    setInterval(function() {
        try {
            lyric_elements[position - 1].className = 'lyric-line'
        } catch (e) { }
        let element = lyric_elements[position]
        element.className = 'lyric-line active'
        let height = element.offsetHeight
        window.scrollBy(0, height)
        console.log(height)
        position++
    }, 1000)
}