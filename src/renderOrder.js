const name = 'cart'
const URL = 'http://my-json-server.typicode.com/MIDAS26/MIDAS26.github.io/db';

const section = document.getElementsByTagName('section')[0]
let local = JSON.parse(localStorage.getItem(name))


window.onload = () => {
    localStorage.setItem(name, JSON.stringify(local))
    render()
}

function getObj(url) {
    return fetch(url).then(data => data.json());
}

// function renderItem(id) {
//     let style = document.createElement('link');
//     style.setAttribute('rel', 'stylesheet');
//     style.setAttribute('href', 'css/cart.css');
//     head.appendChild(style)
//     JSON.stringify(getObj(URL).then(data => {
//         for (let key in data.items) {
//             console.log(data.items[key].id);
//             if (data.items[key].id == id) {
//             }}})}
function render() {
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
                        item.setAttribute('onclick', "check('" + obj.id +"', '" + data.items[key].price + "')");
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
                        p.setAttribute('id', 'p'+obj.id);
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
                        column.appendChild(hr)
                        pp.innerHTML = sum + ' грн'
                    }

                }

            }))
        })


    }
}
function check(id, price) {
    console.log(id)
    let idcheck = document.getElementById(id)
    let col = document.getElementsByClassName('column')[0]
    let pp = document.getElementById('sum')
    let p = document.getElementById('p'+id)

    let items = JSON.parse(localStorage.getItem(name))
    let trash = idcheck.children[2]
    let sum = 0
    let a = 0
    idcheck.children[1].children[0].onclick = () => {
        let current = Number(idcheck.children[1].children[1].innerHTML)
        idcheck.children[1].children[1].innerHTML  = String(current + 1)
        rem(id)
        createLocalObject(id, current + 1)
        p.innerHTML = price * (current + 1)+" грн"
        for (let i = 0;i<col.children.length;i++){
            if (i%2 === 0){
                a = Number((col.children[i].children[0].children[1].children[1].innerHTML).substring(0, ((col.children[i].children[0].children[1].children[1].innerHTML).length-4)));
                console.log(a);
                sum += a
            }
        }
        pp.innerHTML = sum + ' грн'
    }
    idcheck.children[1].children[2].onclick = () => {
        let current = Number(idcheck.children[1].children[1].innerHTML)
        if (idcheck.children[1].children[1].innerHTML!=='1'){
            idcheck.children[1].children[1].innerHTML  = String(current - 1)
            rem(id)
            createLocalObject(id, current - 1)
            p.innerHTML = price * (current - 1)+" грн"
            for (let i = 0;i<col.children.length;i++){
                if (i%2 === 0){
                    a = Number((col.children[i].children[0].children[1].children[1].innerHTML).substring(0, ((col.children[i].children[0].children[1].children[1].innerHTML).length-4)));
                    console.log(a);
                    sum += a
                }
            }
            pp.innerHTML = sum + ' грн'
        }
    }
    trash.onclick = () => {
        rem(id);
        while (idcheck.firstChild) {
            idcheck.removeChild(idcheck.firstChild)
        }
        col.removeChild(col.children[0]);
        // col.removeChild(col.children[0]);
        for (let i = 0;i<col.children.length;i++){
            if (i%2 === 0){
                a = Number((col.children[i].children[0].children[1].children[1].innerHTML).substring(0, ((col.children[i].children[0].children[1].children[1].innerHTML).length-4)));
                console.log(a);
                sum += a
            }
        }
        pp.innerHTML = sum + ' грн'
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



function createObject(id, count = 1) {
    return {
        id: id,
        counter: count
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

function createLocalObject(id, count = 1) {
    let arrayOfObjects = [...getLocal()]
    if (arrayOfObjects === []) {
        setLocal([createObject(id, count)])
    } else {
        arrayOfObjects.unshift(createObject(id, count))
        localStorage.removeItem(name)
        setLocal(arrayOfObjects)
    }
}

function setLocal(array) {
    localStorage.setItem(name, JSON.stringify(array));
}