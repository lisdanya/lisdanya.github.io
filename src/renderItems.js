const URL = 'http://my-json-server.typicode.com/MIDAS26/MIDAS26.github.io/db';

function getObj(url) {
    return fetch(url).then(data => data.json());
}

JSON.stringify(getObj(URL).then(data => {
    let c = 0
    let w = 1
    for (let key in data.items) {
        c+=1
        if (c === 4){
            w = 2
        }
        let wrap = document.createElement('div');
        wrap.setAttribute('class', 'wrap'+w);

        console.log(data.items[key].id)
    }
}))

// <div class="wrap1">
//     <div class="col-1">
//     <img class="item" src="https://alanterz.com/image/cache/catalog/hoodies/Incurection%202.0-370x472.jpg"
// alt="">
//     <h4><a class="name" href="">Insurrection 2.0 Chain Black Hood </a></h4>
// <div class="price">
//     <span class="price-new">1280 грн. </span>
// </div>
// <div class="some"><a href="https://alanterz.com" target="_blank"></a></div>
// </div>
