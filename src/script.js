const URL = 'db.json';
let name = 'cart'
const section = document.getElementsByTagName('section')[0]
const body = document.getElementsByTagName('body')[0]
const footer = document.getElementsByTagName('footer')[0]
const head = document.getElementsByTagName('head')[0]
const load = document.getElementsByClassName('all')[0]
const basket_counter = document.getElementsByClassName('bask-cou')[0]
let local = JSON.parse(localStorage.getItem(name))


window.onload = () => {
    if (!localStorage.getItem(name)) {
        localStorage.setItem(name, '[]')
    }
    counterCart()
    // renderIndex()
    routing()
}
toTop.onclick = function() {
    headerrrr.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    })
}

window.onhashchange = () => {
    counterCart()
    routing()
}

function routing() {
    if (location.hash.slice(1) === 'main' || location.hash === '') {
        renderIndex()
    } else if (location.hash.slice(1) === 'products') {
        renderProducts()
    } else if (location.hash.slice(1, 6) === 'item_') {
        let id = location.hash.slice(6)
        console.log(id)
        if (id <= 5 || id >= 0) {
            renderItem(id)
        } else {
            location.hash = ""
        }
    } else if (location.hash.slice(1) === 'cart') {
        renderCart()
    } else if (location.hash.slice(1) === 'about') {
        renderAbout()
    } else if (location.hash.slice(1) === 'pay') {
        renderPay()
    }
}

function getObj(url) {
    return fetch(url).then(data => data.json());
}

function createObject(id, count = 1, size = '') {
    return {
        id: id,
        counter: count,
        size: size
    }
}

function getLocal() {
    let arr = []
    if (localStorage.getItem(name) == null) {
        arr = []
    } else {
        let object = localStorage.getItem(name)
        arr = JSON.parse(object)
    }
    return arr
}

function createLocalObject(id, count = 1, size = '') {
    let arrayOfObjects = [...getLocal()]
    if (arrayOfObjects === []) {
        setLocal([createObject(id, count, size)])
    } else {
        arrayOfObjects.unshift(createObject(id, count, size))
        localStorage.removeItem(name)
        setLocal(arrayOfObjects)
    }
}

function setLocal(array) {
    localStorage.setItem(name, JSON.stringify(array));
}

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
        title.setAttribute('class', 'title1');
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
        c = 0
        for (let key in data.items) {
            c += 1
            let col = document.createElement('div');
            col.setAttribute('class', 'col-' + c);
            row.appendChild(col)
            let item = document.createElement('img');
            item.setAttribute('class', 'item_m');
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
            some.setAttribute('onclick', 'location.hash = "item_' + data.items[key].id + '";');
            col.appendChild(some)
            if (c === 3) {
                break
            }
        }
    }))
    loading()
}

function renderAbout() {
    scrollTop()
    preloading()

    head.removeChild(head.lastElementChild)
    let style = document.createElement('link');
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('href', 'css/about.css');
    head.appendChild(style);
    while (section.firstChild) {
        section.removeChild(section.firstChild)
    }
    body.removeAttribute("style");
    let white = document.createElement('div');
    white.setAttribute('class', 'white');
    section.appendChild(white);
    let top = document.createElement('div');
    section.appendChild(top);
    let idTop = document.createElement('a');
    idTop.setAttribute('id', 'idTop');
    top.appendChild(idTop);
    let form = document.createElement('div')
    form.innerHTML =
        '<div class="white"></div>\n' +
        '\n' +
        '    <div class="title">\n' +
        '        <h1>О НАС</h1>\n' +
        '    </div>\n' +
        '    <div class="container">\n' +
        '        <div class="row">\n' +
        '            <div class="col6">\n' +
        '                <div class="text-block">\n' +
        '                    <p>SinigamiStore - бренд для тех, кто хочет выделяться.</p>\n' +
        '\n' +
        '                    <p>Мы молодая команда энтузиастов, вдохновленная японской культурой. Мы хотим оставить след в моде и поделиться с вами нашим видением создания искусства. Наша цель - собрать компанию единомышленников, которые так же сильно вдохновлены эстетикой Японии.</p>\n' +
        '\n' +
        '                    <p>Для воплощения наших безумных идей мы используем многочисленные материалы и собираем из них нечто уникальное. Надеемся, что вы по достоинству оцените наше творчество, представленное в наших коллекциях, и поделитесь им с другими.</p>\n' +
        '\n' +
        '                    <p>Так же не забудте заглянуть в наш Instagram и TikTok аккаунты, где вы сможете увидеть уникальные кадры бэкстейджев и жизни нашего бренда.</p>\n' +
        '\n' +
        '                    <p>Будем безумно рады встретить вас на улице в нашей одежде.</p>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="col4">\n' +
        '                <p></p>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '<div class="roww"> \n' +
        '  <div class="columnn">\n' +
        '    <img src="img/item-img/DSC03125.jpg" style="width:100%">\n' +
        '    <img src="img/item-img/DSC03161.jpg" style="width:100%">\n' +
        '  </div>\n' +
        '  <div class="columnn">\n' +
        '    <img src="img/item-img/DSC03212.jpg" style="width:100%">\n' +
        '    <img src="img/item-img/124124.png" style="width:100%">\n' +
        '  </div>  \n' +
        '</div>'

    section.appendChild(form);

    loading()
}

function renderPay() {
    scrollTop()
    preloading()
    head.removeChild(head.lastElementChild)

    let style = document.createElement('link');
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('href', 'css/about.css');
    head.appendChild(style);
    while (section.firstChild) {
        section.removeChild(section.firstChild)
    }
    body.removeAttribute("style");
    let white = document.createElement('div');
    white.setAttribute('class', 'white');
    section.appendChild(white);
    let top = document.createElement('div');
    section.appendChild(top);
    let idTop = document.createElement('a');
    idTop.setAttribute('id', 'idTop');
    top.appendChild(idTop);
    let form = document.createElement('div')
    form.innerHTML =
        '<div class="white"></div>\n' +
        '\n' +
        '    <div class="title">\n' +
        '        <h1>ОПЛАТА</h1>\n' +
        '    </div>\n' +
        '    <div class="container">\n' +
        '        <div class="row">\n' +
        '            <div class="col6">\n' +
        '                <div class="text-block">\n' +
        '<p>Доставка по Украине: доставка исполняется в отделение компании «Новая Почта», выбранное вами при оформлении заказа. Срок доставки: 1-3 рабочих дня. Изготовление самого изделия может занимать до 14 рабочих дней.</p>\n' +
        '    <p>В случае, если товар имеет заводской брак или размер, несовпадающий с размером в заказе, клиент имеет право вернуть его или обменять на аналогичный продукт высокого качества. Требования клиента удовлетворяются в течение 14 рабочих дней со дня поставки. Для получения дополнительной информации свяжитесь с нами по электронной почте.</p>\n' +
        '    <p>Оплата производиться наложенным платежом при получении заказа в отделении компании «Новая Почта»</p>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="col4">\n' +
        '                <p></p>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '<div class="roww"> \n' +
        '  <div class="columnn">\n' +
        '    <img src="img/item-img/DSC02959.jpg" style="width:100%">\n' +
        '    <img src="img/item-img/5325235232.png" style="width:100%">\n' +
        '  </div>\n' +
        '  <div class="columnn">\n' +
        '    <img src="img/item-img/DSC02607.jpg" style="width:100%">\n' +
        '    <img src="img/item-img/DSC02912.jpg" style="width:100%">\n' +
        '  </div>  \n' +
        '</div>' +
        '</div>'


    section.appendChild(form);

    loading()
}

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
        c = 0
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
            item.setAttribute('class', 'item_p');
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
            some.setAttribute('onclick', 'location.hash = "item_' + data.items[key].id + '";');
            col.appendChild(some)
        }
    }))
    loading()

}

// function renderThanks() {
function counterCart() {
    let local = JSON.parse(localStorage.getItem(name))
    basket_counter.innerHTML = local.length;
}


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
                item.setAttribute('class', 'item_i');
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
                let size = document.createElement('div');
                size.setAttribute('class', 'size')
                description.appendChild(size)

                let size_item_s = document.createElement('button');
                size_item_s.setAttribute('class', 'size_item')
                size_item_s.innerHTML = 'S'
                size.appendChild(size_item_s)

                let size_item_m = document.createElement('button');
                size_item_m.setAttribute('class', 'size_item')
                size_item_m.innerHTML = 'M'
                size.appendChild(size_item_m)

                let size_item_l = document.createElement('button');
                size_item_l.setAttribute('class', 'size_item')
                size_item_l.innerHTML = 'L'
                size.appendChild(size_item_l)

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
                for (let i = 0; i < 3; i++) {
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
                        item.setAttribute('class', 'item_i_b s_i');
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
                        some.setAttribute('onclick', 'location.hash = "item_' + data.items[key].id + '";');
                        col.appendChild(some)
                        if (c === 3) {
                            break
                        }
                    }
                }
                setTimeout(() => {
                    local = JSON.parse(localStorage.getItem(name))
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
                    let curent_size = ''
                    size_item_s.onclick = () => {
                        curent_size = 'S'
                    }
                    size_item_m.onclick = () => {
                        curent_size = 'M'
                    }
                    size_item_l.onclick = () => {
                        curent_size = 'L'
                    }
                    button.onclick = () => {
                        if (added === false) {
                            createLocalObject(id, 1, curent_size);
                            added = true;
                            counterCart()
                            renderPopUp(id, curent_size);
                        }
                        button.innerHTML = 'Уже в корзине'


                    }
                    let q1 = document.getElementsByClassName('q1')[0]
                    let q2 = document.getElementsByClassName('q2')[0]
                    let q3 = document.getElementsByClassName('q3')[0]
                    let img = document.getElementsByClassName('item_i')[0]
                    q1.onclick = function () {
                        img.src = data.items[key].images[0]
                    }
                    q2.onclick = function () {
                        img.src = data.items[key].images[4]
                    }
                    q3.onclick = function () {
                        img.src = data.items[key].images[5]
                    }


                    size_item_s.onclick = function () {
                        size_item_s.style = 'background: #ededed;\n' +
                                            'color: black;'
                        size_item_m.style = ''
                        size_item_l.style = ''
                    }
                    size_item_m.onclick = function () {
                        size_item_s.style = ''
                        size_item_m.style = 'background: #ededed;\n' +
                                            'color: black;'
                        size_item_l.style = ''
                    }
                    size_item_l.onclick = function () {
                        size_item_s.style = ''
                        size_item_m.style = ''
                        size_item_l.style = 'background: #ededed;\n' +
                                            'color: black;'
                    }
                }, 500);
            }
        }
    }))
    loading(800)
}
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
function renderPP(){
    let content = ""
}

function renderPopUp(id, size) {
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
                let si = document.createElement('p');
                si.innerHTML = 'Размер: ' + size
                desc.appendChild(si)
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

function renderCart() {
    // location.hash = 'cart'
    scrollTop()
    preloading()

    head.removeChild(head.lastElementChild)
    let style = document.createElement('link');
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('href', 'css/cart.css');
    head.appendChild(style)
    while (section.firstChild) {
        section.removeChild(section.firstChild)
    }
    body.removeAttribute("style");
    if (localStorage.getItem(name)) {
        let items = JSON.parse(localStorage.getItem(name))
        let white = document.createElement('div');
        white.setAttribute('class', 'white');
        section.appendChild(white);
        let title = document.createElement('div');
        title.setAttribute('class', 'title');
        section.appendChild(title);
        let h1 = document.createElement('h1');
        h1.innerHTML = 'Корзина'
        title.appendChild(h1);
        let containerMain = document.createElement('div');
        containerMain.setAttribute('class', 'container-main');
        section.appendChild(containerMain)
        let column = document.createElement('div');
        column.setAttribute('class', 'column');
        column.setAttribute('id', 'column-email');
        containerMain.appendChild(column)
        let sum = 0
        let columnN = document.createElement('div');
        columnN.setAttribute('class', 'column');
        containerMain.appendChild(columnN)
        let total = document.createElement('div');
        total.setAttribute('class', 'total');
        columnN.appendChild(total)
        let pp = document.createElement('p');
        pp.setAttribute('id', 'sum');
        pp.innerHTML = sum + ' грн'
        total.appendChild(pp)
        let form = document.createElement('div')
        form.innerHTML =
            '<div class="col-50">\n' +
            '    <label for="fname" class="head-form"><i></i>ФИО</label>\n' +
            '    <input type="text" id="fname" name="firstname" placeholder="Иванов Иван Иванович" required>\n' +
            '    <label for="email"><i></i> Email</label>\n' +
            '    <input type="email" id="email" placeholder="you@example.com" pattern="[\\w\\d\\.]+@[\\w\\d\\.]+?\\.[\\w\\d]+" required>\n' +
            '    <label for="phone"><i></i>Телефон</label>\n' +
            '    <input type="tel" id="phone" name="phone" maxlength="10" minlength="10" pattern="0[0-9]{9}" placeholder="0731109681" required>\n' +
            '    <label for="city"><i></i>Город</label>\n' +
            '    <input type="text" id="city" name="city" placeholder="Запорожье">\n' +
            '    <label for="zip">Номер отделения Новой Почты</label>\n' +
            '    <input type="text" id="zip" maxlength="5" minlength="5" name="zip" placeholder="01010">\n' +
            '</div>'
        columnN.appendChild(form)
        let ordering = document.createElement('div');
        ordering.setAttribute('class', 'ordering1');
        columnN.appendChild(ordering)
        let button = document.createElement('input');
        button.setAttribute('onclick', 'sendEmail()');
        button.setAttribute('type', 'button');
        button.setAttribute('value', 'Оформить заказ');
        ordering.appendChild(button)
        items.forEach((obj) => {
            JSON.stringify(getObj(URL).then(data => {
                for (let key in data.items) {
                    console.log(data.items[key].id);
                    if (data.items[key].id == obj.id) {
                        let item = document.createElement('div');
                        sum += Number(data.items[key].price)
                        console.log(sum);
                        item.setAttribute('id', obj.id);
                        item.setAttribute('class', 'block');
                        item.setAttribute('onclick', "check('" + obj.id + "', '" + data.items[key].price + "')");
                        column.appendChild(item)
                        let block = document.createElement('div');
                        block.setAttribute('class', 'img-title');
                        item.appendChild(block)
                        let img = document.createElement('img');
                        img.setAttribute('class', 'bask-img')
                        img.setAttribute('src', data.items[key].images[1])
                        block.appendChild(img)
                        let desc = document.createElement('div');
                        desc.setAttribute('class', 'desc');
                        block.appendChild(desc)
                        let h4 = document.createElement('h4');
                        h4.innerHTML = data.items[key].productName
                        h4.setAttribute('id', 'name-for-cart')
                        desc.appendChild(h4)
                        let p = document.createElement('p');
                        p.setAttribute('id', 'p' + obj.id);
                        p.innerHTML = data.items[key].price + ' грн'
                        desc.appendChild(p)
                        let size = document.createElement('p');
                        size.setAttribute('class', 'size_cart');
                        size.innerHTML = 'Размер: ' + obj.size
                        desc.appendChild(size);
                        let count = document.createElement('div');
                        count.setAttribute('class', 'count');
                        item.appendChild(count)
                        let plus = document.createElement('button');
                        plus.setAttribute('class', 'plus');
                        plus.innerHTML = '+'
                        count.appendChild(plus)
                        let counter = document.createElement('p');
                        counter.setAttribute('class', 'counter');
                        counter.setAttribute('id', 'counter-for-cart');
                        counter.innerHTML = obj.counter
                        count.appendChild(counter)
                        let minus = document.createElement('button');
                        minus.setAttribute('class', 'minus');
                        minus.innerHTML = '-'
                        count.appendChild(minus)
                        let trash = document.createElement('img');
                        trash.setAttribute('src', 'img/close-512.png');
                        trash.setAttribute('style', 'width: 27px;height: 27px;margin-bottom: 0px;');
                        item.appendChild(trash)
                        let hr = document.createElement('hr');
                        hr.setAttribute('style', "width: 100%;");
                        hr.setAttribute('class', data.items[key].id);
                        column.appendChild(hr)
                        pp.innerHTML = 'Итого: ' + sum + ' грн'
                    }

                }

            }))
        })
    }
    loading(1600)
}

function check(id, price, size) {
    console.log(id)
    let idcheck = document.getElementById(id)
    let col = document.getElementsByClassName('column')[0]
    let pp = document.getElementById('sum')
    let p = document.getElementById('p' + id)
    let hr = document.getElementsByClassName(id)[0]
    let items = JSON.parse(localStorage.getItem(name))
    let trash = idcheck.children[2]
    let sum = 0
    let a = 0
    idcheck.children[1].children[0].onclick = () => {
        let current = Number(idcheck.children[1].children[1].innerHTML)
        idcheck.children[1].children[1].innerHTML = String(current + 1)
        rem(id)
        createLocalObject(id, current + 1, size)
        p.innerHTML = price * (current + 1) + " грн"
        for (let i = 0; i < col.children.length; i++) {
            if (i % 2 === 0) {
                a = Number((col.children[i].children[0].children[1].children[1].innerHTML).substring(0, ((col.children[i].children[0].children[1].children[1].innerHTML).length - 4)));
                console.log(a);
                sum += a
            }
        }
        counterCart()
        pp.innerHTML = 'Итого: ' + sum + ' грн'
    }
    idcheck.children[1].children[2].onclick = () => {
        let current = Number(idcheck.children[1].children[1].innerHTML)
        if (idcheck.children[1].children[1].innerHTML !== '1') {
            idcheck.children[1].children[1].innerHTML = String(current - 1)
            rem(id)
            createLocalObject(id, current - 1, size)
            p.innerHTML = price * (current - 1) + " грн"
            for (let i = 0; i < col.children.length; i++) {
                if (i % 2 === 0) {
                    a = Number((col.children[i].children[0].children[1].children[1].innerHTML).substring(0, ((col.children[i].children[0].children[1].children[1].innerHTML).length - 4)));
                    console.log(a);
                    sum += a
                }
            }

            pp.innerHTML = 'Итого: ' + sum + ' грн'
        }
    }
    trash.onclick = () => {
        rem(id);
        while (idcheck.firstChild) {
            idcheck.removeChild(idcheck.firstChild)
        }
        idcheck.remove();
        hr.remove();
        // col.removeChild(col.children[0]);
        for (let i = 0; i < col.children.length; i++) {
            if (i % 2 === 0) {
                a = Number((col.children[i].children[0].children[1].children[1].innerHTML).substring(0, ((col.children[i].children[0].children[1].children[1].innerHTML).length - 4)));
                console.log(a);
                sum += a
            }
        }
        pp.innerHTML = 'Итого: ' + sum + ' грн'
        counterCart()
    }

}

function rem(id) {
    if (localStorage.getItem(name)) {
        local = JSON.parse(localStorage.getItem(name))
        let i = 0
        local.forEach((obj) => {
            if (obj.id === id) {
                local.splice(i, 1)
            }
            i++
        })
        localStorage.setItem(name, JSON.stringify(local))
    }
}
