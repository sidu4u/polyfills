// // write a function to clear all settimeouts

const window = global;
const originalTimeout = window.setTimeout;
const originalClearTimeout = window.clearTimeout;

 class TimeoutUtils{
    static #timeoutIds = [];
    static setTimoutWrapper(callback, delay){
        const timeoutId = originalTimeout(callback, delay);
        this.#timeoutIds.push(timeoutId);
    }
    static clearAllTimeouts(){
        for(let timeoutId of this.#timeoutIds){
            originalClearTimeout(timeoutId);
        }
    }
}

window.setTimeout = TimeoutUtils.setTimoutWrapper.bind(TimeoutUtils); // can't rebind it again


window.setTimeout(()=>console.log('this is first function', 1000), 1000);
window.setTimeout(()=>console.log('this is second function', 2000), 2000);
window.setTimeout(()=>console.log('this is third function', 4000), 4000);

originalTimeout(()=>TimeoutUtils.clearAllTimeouts(), 3000);
