const URL = 'http://my-json-server.typicode.com/MIDAS26/MIDAS26.github.io/db';

function getObj(url) {
    return fetch(url).then(data => data.json());
}

JSON.stringify(getObj(URL).then(data => {
        for (let key in data.items) {
            console.log(data.items[key].id)
        }
    }))

// let js = getObj(URL)
// console.log(js);
// console.log(JSON.stringify(js));

