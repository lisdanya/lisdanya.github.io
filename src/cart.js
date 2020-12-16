let name = 'cart'
const head = document.getElementsByTagName('head')[0]
const section = document.getElementsByTagName('section')[0]
const body = document.getElementsByTagName('body')[0]

import {createLocalObject} from "./local.js";
import {loading, scrollTop} from "./animation.js";
import {preloading} from "./animation.js";
import {getObj} from "./local";
import {counterCart} from "./script.js";


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
            '    <input type="text" id="fname" name="firstname" placeholder="Иванов Иван Иванович">\n' +
            '    <label for="email"><i></i> Email</label>\n' +
            '    <input type="email" id="email" placeholder="you@example.com" required="" pattern="[\\w\\d\\.]+@[\\w\\d\\.]+?\\.[\\w\\d]+">\n' +
            '    <label for="phone"><i></i>Телефон</label>\n' +
            '    <input type="tel" id="phone" name="phone" maxlength="10" minlength="10" pattern="0[0-9]{9}" placeholder="0731109681">\n' +
            '    <label for="adr"><i></i>Адрес</label>\n' +
            '    <input type="text" id="adr" name="address" placeholder="ул. Пушкина, 13б">\n' +
            '    <label for="city"><i></i>Город</label>\n' +
            '    <input type="text" id="city" name="city" placeholder="Запорожье">\n' +
            '    <div class="row">\n' +
            '        <div class="col-50">\n' +
            '            <label for="state">Область</label>\n' +
            '            <input type="text" id="state" name="state" placeholder="Запорожская обл.">\n' +
            '        </div>\n' +
            '        <div class="col-50">\n' +
            '            <label for="zip">Почтовый индекс</label>\n' +
            '            <input type="text" id="zip" maxlength="5" minlength="5" name="zip" placeholder="01010">\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</div>'
        columnN.appendChild(form)
        let ordering = document.createElement('div');
        ordering.setAttribute('class', 'ordering');
        columnN.appendChild(ordering)
        let button = document.createElement('button');
        button.innerHTML = 'Оформить заказ'
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
                        desc.appendChild(h4)
                        let p = document.createElement('p');
                        p.setAttribute('id', 'p' + obj.id);
                        p.innerHTML = data.items[key].price + ' грн'
                        desc.appendChild(p)
                        let count = document.createElement('div');
                        count.setAttribute('class', 'count');
                        item.appendChild(count)
                        let plus = document.createElement('button');
                        plus.setAttribute('class', 'plus');
                        plus.innerHTML = '+'
                        count.appendChild(plus)
                        let counter = document.createElement('p');
                        counter.setAttribute('class', 'counter');
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
function check(id, price) {
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
        createLocalObject(id, current + 1)
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
            createLocalObject(id, current - 1)
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
        let local = JSON.parse(localStorage.getItem(name))
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

export {
    renderCart,
    rem,
    check
}