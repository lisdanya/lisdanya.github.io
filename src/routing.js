import {renderCart} from "./cart.js";
import {renderIndex} from "./renderIndex.js";
import {renderProducts} from "./renderProducts.js";
import {renderItem} from "./renderItem.js";

function routing() {
    if(location.hash.slice(1) === 'main'||location.hash === ''){
        renderIndex()
    }
    else if(location.hash.slice(1) === 'products'){
        renderProducts()
    }
    else if(location.hash.slice(1,6) === 'item_'){
        let id = location.hash.slice(6)
        console.log(id)
        if (id<=5||id>=0){
            renderItem(id)
        }else{
            location.hash = ""
        }
    }else if(location.hash.slice(1) === 'cart'){
        renderCart()
    }
}

export {routing}