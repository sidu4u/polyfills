// Extend the local storage to accept an expiry time and expire the entry after that time. Localstorage do not have expiry time as of now in the browser.
// // set 'bar' on 'foo' that will expiry after 1000 milliseconds
// myLocalStorage.setItem('foo', 'bar', 1000);

// // after 2 seconds
// console.log(myLocalStorage.getItem('foo'));
// // null

// Extend the local storage to accept an expiry time and expire the entry after that time. Localstorage do not have expiry time as of now in the browser.
// // set 'bar' on 'foo' that will expiry after 1000 milliseconds
// myLocalStorage.setItem('foo', 'bar', 1000);

// // after 2 seconds
// console.log(myLocalStorage.getItem('foo'));
// // null

const getExpiryValue = (str) => {
    if(!str) {
        return null;
    }
    const splitMatch = str.split(';').filter(str => str.match(/expiry=(\d+)/));
    if(splitMatch){
        return splitMatch[0].split('=')[1];
    }

    return null;
}

const getValue = (str) => {
    if(!str) {
        return null;
    }
    const splitMatch = str.split(';').filter(str => str.match(/value=([a-zA-Z0-9]+)/));
    if(splitMatch){
        return splitMatch[0].split('=')[1];
    }

    return null;
}

function extendLocalStorage(){
    
    window.myLocalStorage = {
        setItem(key, value, expiry){
            const expiryValue = Date.now() + expiry * 1000;
            window.localStorage.setItem(key, `value=${value};expiry=${expiryValue}`);
        },
        getItem(key){
            const storeValue = window.localStorage.getItem(key);
            const expiry = getExpiryValue(storeValue);
            const value = getValue(storeValue);
            if(!expiry ||expiry > Date.now() ){
                return value
            }
            return null;
        }
    };
}

extendLocalStorage();

myLocalStorage.setItem('temp', 'val', 3);

setTimeout(()=>console.log(myLocalStorage.getItem('temp')), 2000);