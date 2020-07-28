function myDebounce1(toDebounce, delay) {
    let timer;
    let flag = true;

    return function (...args) {
        let that = this;

        if (!flag) {
            timer && clearTimeout(timer);
            timer = setTimeout(() => flag = true, delay);
        }
        else {
            flag = false;
            toDebounce.call(that, ...args);
            timer = setTimeout(() => flag = true, delay);
        }
    }
}

function myDebounce2(toDebounce, delay) {
    let timer;

    return function (...args) {
        let that = this;

        timer && clearTimeout(timer);
        timer = setTimeout(() => toDebounce.call(that, ...args),delay);
    }
}