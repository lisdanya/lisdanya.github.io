const addBtn = document.getElementById("add_btn");
const remBtn = document.getElementById("remove_btn");
const clearBtn = document.getElementById("clear_local");
const textArea = document.getElementById("textArea");
const title = document.getElementById('title');
const noteList = document.querySelector('.noteList')
const name = 'notes'
let nodelist = document.querySelectorAll('.note');
let local = JSON.parse(localStorage.getItem(name))


window.onbeforeunload = () => {
    local.forEach((obj) => {
        obj.selected = false
    })
    setLocal(local)
}

function render() {
    if (localStorage.getItem(name)) {
        notes = JSON.parse(localStorage.getItem(name))
        notes.forEach((obj) => {
            let datestr = new Date(obj.data);
            let note = document.createElement('div');
            noteList.appendChild(note)
            note.setAttribute('class', 'note ' + obj.selected);
            // note.setAttribute('class', obj.selected);
            note.setAttribute('id', obj.id); //???
            note.setAttribute('onclick', "openNoteURL('" + obj.id + "');");
            note.setAttribute('onchange', " refresh('" + obj.id + "');");
            note.setAttribute('onkeyup', " refresh('" + obj.id + "');");
            let h5 = document.createElement('h5');
            note.appendChild(h5)
            h5.setAttribute('class', 'title');
            h5.appendChild(document.createTextNode(obj.title));
            let p = document.createElement('p');
            note.appendChild(p)
            p.setAttribute('class', 'text');
            if (getText().length > 25) {
                p.appendChild(document.createTextNode(obj.text.slice(0, 25) + '...'));
            } else {
                p.appendChild(document.createTextNode(obj.text));
            }
            let date = document.createElement('p');
            note.appendChild(date)
            date.setAttribute('class', 'date');
            date.appendChild(document.createTextNode(datestr.toUTCString()));
        })
    }
}

window.onload = () => {
    render()
}

function delHTML() {
    while (noteList.firstChild) {
        noteList.removeChild(noteList.firstChild)
    }
}

function createLocalObject() {
    let arrayOfObjects = [...getLocal()]
    if (arrayOfObjects === []) {
        setLocal([createObject()])
    } else {
        arrayOfObjects.unshift(createObject())
        localStorage.removeItem(name)
        setLocal(arrayOfObjects)
    }
}

function createObject() {
    return {
        id: makeID(),
        selected: true,
        title: '',
        text: '',
        data: new Date()
    }
}

function renameNote() {
    if (localStorage.getItem(name)) {
        local.forEach((obj) => {
            if (obj.selected === true) {
                obj.title = getTitle()
                obj.data = new Date()
            }
        })
        setLocal(local)
        delHTML()
        render()
    }
}

function changeText() {
    if (localStorage.getItem(name)) {
        local.forEach((obj) => {
            if (obj.selected === true) {
                obj.text = getText()
                obj.data = new Date()
            }
        })
        setLocal(local)
        delHTML()
        render()
    }
}

function unselected() {
    if (localStorage.getItem(name)) {
        local.forEach((obj) => {
            obj.selected = false
        })
        setLocal(local)
    }
}




function clearAllText() {
    textArea.value = ''
    title.value = ''
}

function createNote() {
    clearAllText()
    let nodelist = document.querySelectorAll('.note');
    nodelist.forEach((elem) => {
        if (elem.className === 'note true') {
            elem.className = 'note false'
        }
    })
    let note = document.createElement('div');
    noteList.prepend(note)
    note.setAttribute('class', 'note true');
    note.setAttribute('id', JSON.parse(localStorage.getItem(name))[0].id); //???
    note.setAttribute('onclick', "openNoteURL('" + JSON.parse(localStorage.getItem(name))[0].id + "');");
    note.setAttribute('onchange', " refresh('" + JSON.parse(localStorage.getItem(name))[0].id + "');");
    note.setAttribute('onkeyup', " refresh('" + JSON.parse(localStorage.getItem(name))[0].id + "');");
    let h5 = document.createElement('h5');
    note.appendChild(h5)
    h5.setAttribute('class', 'title');
    h5.appendChild(document.createTextNode(getTitle()));
    let p = document.createElement('p');
    note.appendChild(p)
    p.setAttribute('class', 'text');
    p.setAttribute('class', 'date');
    if (getText().length > 25) {
        p.appendChild(document.createTextNode(getText().slice(0, 25) + '...'));
    } else {
        p.appendChild(document.createTextNode(getText()));
    }
    let date = document.createElement('p');
    datestr = new Date(JSON.parse(localStorage.getItem(name))[0].data)
    note.appendChild(date)
    date.setAttribute('class', 'date');
    date.appendChild(document.createTextNode(datestr.toUTCString()));
}

function setLocal(array) {
    localStorage.setItem(name, JSON.stringify(array));
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

function getText() {
    return textArea.value;
}

function getTitle() {
    return title.value;
}

function generateID() {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return characters.charAt(Math.floor(Math.random() * characters.length));
}

function makeID() {
    let result = '';
    for (let i = 0; i < 5; i++) {
        result += generateID();
    }
    return result;
}

function openNoteURL(id) { //!!
    openNote(id)
    console.log(id);
    window.location.hash = id
}

function openNote(id) {
    local = JSON.parse(localStorage.getItem(name))
    local.forEach((obj) => {
        curentNote = document.getElementById(obj.id)
        if (obj.id === id) {
            textArea.value = obj.text
            title.value = obj.title
            obj.selected = true
            curentNote.className = 'note true'
        } else {
            obj.selected = false
            curentNote.className = 'note false'
        }
    })
    setLocal(local)
}

function refresh(id) {
    CurentNode = document.getElementById(id)
    titleNode = curentNote.childNodes[0]
    textNode = curentNote.childNodes[1]
    local.forEach((obj) => {
        curentObj = document.getElementById(obj.id)
        if (obj.id === id) {
            textNode.value = obj.text
            titleNode.value = obj.title
        }
    })
}

function rem() {
    if (localStorage.getItem(name)) {
        local = JSON.parse(localStorage.getItem(name))
        let i = 0
        local.forEach((obj) => {
            if (obj.selected === true) {
                local.splice(i, 1)
            }
            i++
        })
        localStorage.setItem(name, JSON.stringify(local))
    }
    clearAllText()
}

function clearLocal() {
    localStorage.clear()
}

addBtn.onclick = () => {
    unselected()
    createLocalObject()
    createNote()
}
remBtn.onclick = () => {
    window.location.hash = ''
    rem()
    delHTML()
    render()
}
clearBtn.onclick = () => {
    clearLocal()
    delHTML()
    render()
    clearAllText()
}

window.onhashchange = () => {
    if (location.hash === '') {
        unselected()
        delHTML()
        render()
        textArea.value = '';
        title.value = '';
    }
    id = location.hash.slice(0);
    local = JSON.parse(localStorage.getItem(name))
    local.forEach((elem) => {
        if (elem.id === id.slice(1, 6)) {
            openNote(elem.id)
        }
    })
}