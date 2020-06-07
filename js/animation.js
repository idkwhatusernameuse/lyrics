var position = 0;
var lyric_elements; 

var interval
var timeout

export function start() {
    lyric_elements = document.querySelectorAll('.lyric-line')
    setTimeout(scroll, lyric_elements[position].dataset.timestamp * 1000)
}


function scroll() {
    console.log('Scroll called on ' + position)
    try {
        lyric_elements[position - 1].className = 'lyric-line'
    } catch (e) { }
    // Current lyric
    let element = lyric_elements[position]
    // Make it the active one
    element.className = 'lyric-line active'
    // Scroll the page to the current line
    let rect = element.getBoundingClientRect()
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    window.scrollTo(0, rect.top + scrollTop - (window.innerHeight * 0.30))
    // Wait for next line
    let time;
    if (position === 0) {
        time = parseFloat(lyric_elements[position].dataset.timestamp)
    } else {
        time = parseFloat(lyric_elements[position].dataset.timestamp) - parseFloat(lyric_elements[position - 1].dataset.timestamp)
    }
    position++
    console.log('new time' + time)
    timeout = setTimeout(scroll, time * 1000)
};

export function changePosition(index) {
    // Clear the active state for all elements. This is inefficient so it should be changed.
    for (let i = 0; i < lyric_elements.length; i++) {
        lyric_elements[i].className = 'lyric-line'
    }
    clearTimeout(timeout)
    position = index
    scroll()
}

export function animateBlobs() {
    let numberX = Math.floor(Math.random() * 100);
    let numberY = Math.floor(Math.random() * -100);
    document.querySelector('#blob1').childNodes[1].style.transform = 'translateX(' + numberX + 'px) translateY(' + numberY + ')'
    numberX = Math.floor(Math.random() * -70);
    numberY = Math.floor(Math.random() * -200);
    document.querySelector('#blob2').childNodes[1].style.transform = 'translateX(' + numberX + 'px) translateY(' + numberY + ')'
    numberX = Math.floor(Math.random() * 100);
    numberY = Math.floor(Math.random() * -200);
    document.querySelector('#blob3').childNodes[1].style.transform = 'translateX(' + numberX + 'px) translateY(' + numberY + ')'
    numberX = Math.floor(Math.random() * -100);
    numberY = Math.floor(Math.random() * -300);
    document.querySelector('#blob4').childNodes[1].style.transform = 'translateX(' + numberX + 'px) translateY(' + numberY + ')'
}