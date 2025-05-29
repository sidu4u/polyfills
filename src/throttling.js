function myThrottling(toThrottle, delay) {
    let isCallAllowed = true

    return function (...args) {
       let that = this;
        if (isCallAllowed) {
            isCallAllowed = false;
            toThrottle.call(that, ...args);
            setTimeout(() => isCallAllowed = true, delay);
        }
    }

}


function myThrottle(func, offset){

    let open = true;

    return function(...args){
        const that = this;
        if(open){
            func.call(that,...args);
            open = false;
        }
        setTimeout(()=>open=true,offset);
    }
}