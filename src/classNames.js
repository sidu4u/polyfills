// classNames('foo', 'bar'); // => 'foo bar'
// classNames('foo', { bar: true }); // => 'foo bar'
// classNames({ 'foo-bar': true }); // => 'foo-bar'
// classNames({ 'foo-bar': false }); // => ''
// classNames({ foo: true }, { bar: true }); // => 'foo bar'
// classNames({ foo: true, bar: true }); // => 'foo bar'

// // lots of arguments of various types
// classNames('foo', { bar: true, duck: false }, 'baz', { quux: true }); // => 'foo bar baz quux'

// // other falsy values are just ignored
// classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, ''); // => 'bar 1'

// const arr = ['b', { c: true, d: false }];
// classNames('a', arr); // => 'a b c'

// let buttonType = 'primary';
// classNames({ [`btn-${buttonType}`]: true });

function classNamesInner(...args){
    const argsArray = [...args];
    let result = [];
    for(let ele of argsArray.filter(ele=>ele)){
        if(ele.constructor === Array){
            result = result.concat(classNames(...ele));
        }
        else if(ele.constructor === Object){
            result.push(Object.keys(ele).filter(key => ele[key]));
        }
        else{
            result.push(ele);
        }
    }

    return result;
}

function classNames(...args){
    return classNamesInner(...args).join(' ');
}

console.log(classNames('foo', 'bar')); // => 'foo bar'
console.log(classNames('foo', { bar: true })); // => 'foo bar'
console.log(classNames({ 'foo-bar': true })); // => 'foo-bar'
console.log(classNames({ 'foo-bar': false })); // => ''
console.log(classNames({ foo: true }, { bar: true })); // => 'foo bar'
console.log(classNames({ foo: true, bar: true })); // => 'foo bar'

// lots of arguments of various types
console.log(classNames('foo', { bar: true, duck: false }, 'baz', { quux: true })); // => 'foo bar baz quux'

// other falsy values are just ignored
console.log(classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, '')); // => 'bar 1'

const arr = ['b', { c: true, d: false }];
console.log(classNames('a', arr)); // => 'a b c'

let buttonType = 'primary';
console.log(classNames({ [`btn-${buttonType}`]: true }));
