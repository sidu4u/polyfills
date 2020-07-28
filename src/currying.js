function myCurry(func) {
    let argsArray = [];
    const funcLength = func.length;

    const generateReturn = () => {
        const input = argsArray.slice(0, funcLength);
        const retVal = func(...input);
        argsArray = [];
        return retVal;
    }

    return function inner(...args) {

        argsArray = [...args, ...argsArray];

        if (argsArray.length < funcLength) {
            return inner;
        }

        return generateReturn();
    }

}

function sum(a, b, c, d) {
    return a + b + c + d;
}

function log() {
    return "logger";
}

const sumCurry = myCurry(sum);
const logCurry = myCurry(log);

console.log(logCurry("sddssd"));
console.log(sumCurry());
console.log(sumCurry(1)(2, 3)(4));
console.log(sumCurry(1, 2, 3)(4));