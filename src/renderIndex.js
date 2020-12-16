let name = 'cart'
const head = document.getElementsByTagName('head')[0]
const section = document.getElementsByTagName('section')[0]
const body = document.getElementsByTagName('body')[0]
import {loading, preloading, scrollTop} from "./animation.js";


function renderIndex() {
    // location.hash = 'main'
    scrollTop()
    preloading()
    head.removeChild(head.lastElementChild)
    while (section.firstChild) {
        section.removeChild(section.firstChild)
    }
    let style = document.createElement('link');
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('href', 'css/main.css');
    head.appendChild(style)
    while (section.firstChild) {
        section.removeChild(section.firstChild)
    }
    body.removeAttribute("style");
    JSON.stringify(getObj(URL).then(data => {
        let white = document.createElement('div');
        white.setAttribute('class', 'white');
        section.appendChild(white);
        let banner = document.createElement('div');
        banner.setAttribute('class', 'banner');
        section.appendChild(banner)
        let a = document.createElement('a');
        a.setAttribute('onclick', 'location.hash = "products"');
        banner.appendChild(a)
        let img = document.createElement('img');
        img.setAttribute('src', 'img/BANNER_ALMOST_FINAL-1600x900.png');
        img.setAttribute('srcset', 'img/BANNER_ALMOST_FINAL_MOBILE-1600x900.png');
        a.appendChild(img)
        let button = document.createElement('button');
        banner.appendChild(button)
        let btn = document.createElement('a');
        btn.setAttribute('onclick', 'location.hash = "products"');
        btn.innerHTML = 'Товары'
        button.appendChild(btn)
        let aA = document.createElement('a');
        aA.setAttribute('onclick', 'location.hash = "products"');
        banner.appendChild(aA)
        let picture = document.createElement('picture');
        aA.appendChild(picture)
        let source = document.createElement('source');
        source.setAttribute('media', '(max-width: 470px)');
        source.setAttribute('srcset', 'img/BANNER_ALMOST_FINAL_MOBILE-1600x900.png');
        picture.appendChild(source)
        let imgG = document.createElement('img');
        imgG.setAttribute('src', 'img/BANNER_ALMOST_FINAL-1600x900.png');
        picture.appendChild(imgG)
        let top = document.createElement('div');
        section.appendChild(top);
        let idTop = document.createElement('a');
        idTop.setAttribute('id', 'idTop');
        top.appendChild(idTop);
        let arrow = document.createElement('a');
        arrow.setAttribute('src', 'https://img2.freepng.ru/20180628/kjo/kisspng-computer-icons-arrow-symbol-contrast-5b35a5c37bc105.7011654215302424995069.jpg');
        idTop.appendChild(arrow)
        let title = document.createElement('div');
        title.setAttribute('class', 'title');
        section.appendChild(title);
        let h1 = document.createElement('h1');
        h1.innerHTML = 'New collection'
        title.appendChild(h1);
        let container = document.createElement('div');
        container.setAttribute('class', 'container');
        section.appendChild(container);
        let newCollection = document.createElement('div');
        newCollection.setAttribute('class', 'new-collection');
        container.appendChild(newCollection)
        let aAA = document.createElement('a');
        aAA.setAttribute('onclick', 'location.hash = "products"');
        newCollection.appendChild(aAA)
        let imgGG = document.createElement('img');
        imgGG.setAttribute('src', 'img/NEW_COLLECTION2.png');
        imgGG.setAttribute('srcset', 'img/NEW_COLLECTION2.png');
        aAA.appendChild(imgGG)
        let row = document.createElement('div');
        row.setAttribute('class', 'row');
        container.appendChild(row);
        let c = 0
        for (let key in data.items) {
            c += 1
            let col = document.createElement('div');
            col.setAttribute('class', 'col-' + c);
            row.appendChild(col)
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
            priceNew.innerHTML = data.items[key].price
            price.appendChild(priceNew)
            let some = document.createElement('div');
            some.setAttribute('class', 'some');
            some.setAttribute('onclick', 'location.hash = "item_'+ data.items[key].id +'";');
            col.appendChild(some)
            if (c === 3) {
                break
            }
        }
    }))
    loading()
}
export {
    renderIndex
}