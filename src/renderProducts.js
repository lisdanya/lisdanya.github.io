import {loading, preloading, scrollTop} from "./animation.js";

let name = 'cart'
const head = document.getElementsByTagName('head')[0]
const section = document.getElementsByTagName('section')[0]
const body = document.getElementsByTagName('body')[0]


function renderProducts() {
    // location.hash = 'products'
    scrollTop()
    preloading()
    head.removeChild(head.lastElementChild)
    let style = document.createElement('link');
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('href', 'css/products.css');
    head.appendChild(style);
    while (section.firstChild) {
        section.removeChild(section.firstChild)
    }
    body.removeAttribute("style");
    JSON.stringify(getObj(URL).then(data => {
        console.log('Products')
        let white = document.createElement('div');
        white.setAttribute('class', 'white');
        section.appendChild(white);
        let top = document.createElement('div');
        section.appendChild(top);
        let idTop = document.createElement('a');
        idTop.setAttribute('id', 'idTop');
        top.appendChild(idTop);
        let title = document.createElement('div');
        title.setAttribute('class', 'title');
        section.appendChild(title);
        let h1 = document.createElement('h1');
        h1.innerHTML = 'Товары'
        title.appendChild(h1);
        let container = document.createElement('div');
        container.setAttribute('class', 'container');
        section.appendChild(container);
        let row = document.createElement('div');
        row.setAttribute('class', 'row');
        container.appendChild(row);
        let wrap1 = document.createElement('div');
        wrap1.setAttribute('class', 'wrap1');
        row.appendChild(wrap1)
        let wrap2 = document.createElement('div');
        wrap2.setAttribute('class', 'wrap2');
        row.appendChild(wrap2)
        let c = 0
        for (let key in data.items) {
            c += 1
            let col = document.createElement('div');
            col.setAttribute('class', 'col-' + c);
            if (c <= 3) {
                wrap1.appendChild(col)
            } else {
                wrap2.appendChild(col)
            }
            let item = document.createElement('img');
            item.setAttribute('class', 'item');
            item.setAttribute('src', data.items[key].images[0]);
            col.appendChild(item)
            let h4 = document.createElement('h4');
            col.appendChild(h4)
            let name = document.createElement('a');
            name.setAttribute('class', 'name');
            name.innerHTML = data.items[key].productName
            h4.appendChild(name)
            let price = document.createElement('div');
            price.setAttribute('class', 'price');
            col.appendChild(price)
            let priceNew = document.createElement('span')
            priceNew.setAttribute('class', 'price-new')
            priceNew.innerHTML = data.items[key].price + ' грн'
            price.appendChild(priceNew)
            let some = document.createElement('div');
            some.setAttribute('class', 'some');
            some.setAttribute('onclick', 'location.hash = "item_'+ data.items[key].id +'";');
            col.appendChild(some)
        }
    }))
    loading()
}
export {
    renderProducts
}