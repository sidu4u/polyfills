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