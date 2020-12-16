import {loading, preloading, scrollTop} from "./animation.js";
const head = document.getElementsByTagName('head')[0]
const section = document.getElementsByTagName('section')[0]
const body = document.getElementsByTagName('body')[0]
let name = 'cart'

function renderItem(id) {
    // location.hash = 'item_'+id
    scrollTop()
    preloading()
    head.removeChild(head.lastElementChild)
    let style = document.createElement('link');
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('href', 'css/item.css');
    head.appendChild(style)
    while (section.firstChild) {
        section.removeChild(section.firstChild)
    }
    body.removeAttribute("style");
    JSON.stringify(getObj(URL).then(data => {
        for (let key in data.items) {
            console.log(data.items[key].id);
            if (data.items[key].id == id) {
                console.log('Item')
                let white = document.createElement('div');
                white.setAttribute('class', 'white');
                section.appendChild(white);
                let title = document.createElement('div');
                title.setAttribute('class', 'title');
                section.appendChild(title);
                let h1 = document.createElement('h1');
                h1.innerHTML = data.items[key].productName
                title.appendChild(h1);
                let containerMain = document.createElement('div');
                containerMain.setAttribute('class', 'container-main');
                section.appendChild(containerMain);
                let col = document.createElement('div');
                col.setAttribute('class', 'col');
                containerMain.appendChild(col);
                let image = document.createElement('div');
                image.setAttribute('class', 'image');
                col.appendChild(image);
                let item = document.createElement('img');
                item.setAttribute('class', 'item');
                item.setAttribute('src', data.items[key].images[0]);
                image.appendChild(item);
                let imgUl = document.createElement('ul');
                imgUl.setAttribute('class', 'img-ul');
                image.appendChild(imgUl);
                for (let i = 1; i < 4; i++) {
                    let li = document.createElement('li');
                    imgUl.appendChild(li);
                    let linkSImg = document.createElement('div');
                    linkSImg.setAttribute('class', 'link-s-img q' + i);
                    li.appendChild(linkSImg);
                    let SImg = document.createElement('img');
                    SImg.setAttribute('class', 's-img');
                    SImg.setAttribute('src', data.items[key].images[i]);
                    linkSImg.appendChild(SImg);
                }
                let colR = document.createElement('div');
                colR.setAttribute('class', 'col r')
                containerMain.appendChild(colR)
                let description = document.createElement('div');
                description.setAttribute('class', 'description')
                colR.appendChild(description)
                let sTitle = document.createElement('div');
                sTitle.setAttribute('class', 's-title')
                description.appendChild(sTitle)
                let h11 = document.createElement('h1');
                h11.innerHTML = data.items[key].productName
                sTitle.appendChild(h11)
                let price = document.createElement('div');
                price.setAttribute('class', 'price')
                description.appendChild(price)
                let h2 = document.createElement('h2');
                h2.innerHTML = data.items[key].price + ' грн'
                price.appendChild(h2)
                let ordering = document.createElement('div');
                ordering.setAttribute('class', 'ordering')
                description.appendChild(ordering)
                let button = document.createElement('button');
                button.setAttribute('id', data.items[key].id);
                button.setAttribute('onclick', 'location.hash = "cart"');
                button.innerHTML = 'Добавить в корзину'
                ordering.appendChild(button)
                let textDescription = document.createElement('div');
                textDescription.setAttribute('class', 'text-description')
                description.appendChild(textDescription)
                let h5 = document.createElement('h5');
                h5.innerHTML = 'Описание'
                textDescription.appendChild(h5)
                let p = document.createElement('p');
                p.innerHTML = data.items[key].info
                textDescription.appendChild(p)
                let ul = document.createElement('ul');
                textDescription.appendChild(ul)
                for (let i = 0; i < 4; i++) {
                    let li = document.createElement('li');
                    li.innerHTML = data.items[key].materials[i]
                    ul.appendChild(li)
                }
                let sizeGrid = document.createElement('div');
                sizeGrid.setAttribute('class', 'size-grid')
                textDescription.appendChild(sizeGrid)
                let img = document.createElement('img');
                img.setAttribute('src', data.items[key].sizeGrid)
                sizeGrid.appendChild(img)
                let row = document.createElement('div');
                row.setAttribute('class', 'row');
                containerMain.appendChild(row);
                let c = 0
                for (let key in data.items) {
                    if (data.items[key].id != id) {
                        c += 1
                        let col = document.createElement('div');
                        col.setAttribute('class', 'col-' + c);
                        row.appendChild(col)
                        let item = document.createElement('img');
                        item.setAttribute('class', 'item s');
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
                        if (c === 3) {
                            break
                        }
                    }
                }
                setTimeout(() => {
                    let local = JSON.parse(localStorage.getItem(name))
                    let added = false
                    if (local) {
                        local.forEach((obj) => {
                            if (obj.id === id) {
                                added = true
                            }
                        })
                    }
                    if (added) {
                        button.innerHTML = 'Уже в корзине'
                    }
                    button.onclick = () => {
                        if (added === false) {
                            createLocalObject(id);
                            added = true;
                            counterCart()
                            renderPopUp(id);
                        }
                        button.innerHTML = 'Уже в корзине'


                    }
                    let q1 = document.getElementsByClassName('q1')[0]
                    let q2 = document.getElementsByClassName('q2')[0]
                    let q3 = document.getElementsByClassName('q3')[0]
                    let img = document.getElementsByClassName('item')[0]
                    q1.onclick = function () {
                        img.src = data.items[key].images[0]
                    }
                    q2.onclick = function () {
                        img.src = data.items[key].images[4]
                    }
                    q3.onclick = function () {
                        img.src = data.items[key].images[5]
                    }
                }, 500);
            }
        }
    }))
    loading(800)
}



function renderPopUp(id) {
    scrollTop()
    body.setAttribute('style', 'overflow: hidden;');
    JSON.stringify(getObj(URL).then(data => {
        for (let key in data.items) {
            console.log(data.items[key].id);
            if (data.items[key].id == id) {
                let smoke = document.createElement('div');
                smoke.setAttribute('class', 'smoke');
                section.appendChild(smoke)
                let popUp = document.createElement('div');
                popUp.setAttribute('class', 'popUp');
                section.appendChild(popUp);
                let colPop = document.createElement('div');
                colPop.setAttribute('class', 'col-pop');
                popUp.appendChild(colPop)
                let block = document.createElement('div');
                block.setAttribute('id', id);
                block.setAttribute('class', 'block');
                block.setAttribute('class', 'block');
                colPop.appendChild(block)
                let imgTitle = document.createElement('div');
                imgTitle.setAttribute('class', 'img-title');
                block.appendChild(imgTitle)
                let img = document.createElement('img');
                img.setAttribute('class', 'bask-img')
                img.setAttribute('src', data.items[key].images[0])
                imgTitle.appendChild(img)
                let desc = document.createElement('div');
                desc.setAttribute('class', 'desc');
                imgTitle.appendChild(desc)
                let h4 = document.createElement('h4');
                h4.innerHTML = data.items[key].productName
                desc.appendChild(h4)
                let p = document.createElement('p');
                p.innerHTML = data.items[key].price + ' грн'
                desc.appendChild(p)
                let buttons = document.createElement('div');
                buttons.setAttribute('class', 'buttons')
                colPop.appendChild(buttons)
                let continuE = document.createElement('button');
                continuE.setAttribute('class', 'continue')
                continuE.setAttribute('onclick', 'location.hash = "products"');
                continuE.innerHTML = 'Продолжить покупки'
                buttons.appendChild(continuE)
                let toCart = document.createElement('button');
                toCart.setAttribute('onclick', 'location.hash = "cart"');
                toCart.setAttribute('class', 'toCart')
                toCart.innerHTML = 'В корзину'
                buttons.appendChild(toCart)
            }
        }
    }))
    loading()
}
export{
    renderPopUp,
    renderItem
}