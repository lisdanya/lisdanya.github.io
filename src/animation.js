const load = document.getElementsByClassName('all')[0]
let header = document.getElementById('top')


function preloading() {
    load.setAttribute('style',
        '\tposition: absolute;\n' +
        '\tleft: 0;\n' +
        '\tbottom: 0;\n' +
        '\ttop: 0;\n' +
        '\tright: 0;\n' +
        '\tz-index: 9999999;\n' +
        '\tbackground-color: whitesmoke;\n' +
        '\t/*opacity: .4;*/"'
    )

}

function loading(time = 800) {
    setTimeout(() => {
        load.setAttribute('style', 'display: none')
        console.log('none');

    }, time);

}

function scrollTop() {
    header.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    })
}

export{
    preloading,
    scrollTop,
    loading
}