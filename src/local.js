let name = 'cart'

function getObj(url) {
    return fetch(url).then(data => data.json());
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

export {
    setLocal,
    createLocalObject,
    getLocal,
    createObject,
    getObj
}

