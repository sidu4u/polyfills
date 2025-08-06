// document.myCookie = "blog=learnersbucket";
// document.myCookie = "name=prashant;max-age=1"; // this will expire after 1 second

// console.log(document.myCookie);
// // "blog=learnersbucket; name=prashant"

// setTimeout(() => {
//   console.log(document.myCookie);
// }, 1500);
// // "name=prashant" is expired after 1 second
// // "blog=learnersbucket"


function customCookie() {
  const store = new Map();

  const parseCookieString = (str) => {
    // return {key, value, options}
    if (!str) {
      return;
    }

    const [keyValue, ...options] = str.split(";");
    const [key, value] = keyValue.split("=");
    const ageString = options.filter((ele) => ele.match(/max-age=\d+/))[0];
    const [_, age] = ageString ? ageString.split("=") : [null, null];

    return age
      ? { key, value, options, age: Date.now() + age * 1000 }
      : { key, value, options };
  };

  Object.defineProperty(global, "myCookie", {
    get() {
      const cookieArr = [];

      for (const [key, { value, age }] of store) {
        if(age !== undefined){
            const currentTime = Date.now();
            if(currentTime > age){
                // expired
                store.delete(key);
                continue;
            }
        }
        cookieArr.push(`${key}=${value}`);
      }

      return cookieArr.join('; ');
    },
    set(str) {
      // we get a colon separated string need to parse it and place it in the store
      const { key, value, options, age } = parseCookieString(str);

      store.set(key, { value, options, age });
    },
  });
}

customCookie();

global.myCookie = "blog=learnersbucket";
global.myCookie = "name=prashant;max-age=1"; 
global.myCookie = "surname=yadav;max-age=3"; 

setTimeout(()=>console.log(global.myCookie), 500);
setTimeout(()=>console.log(global.myCookie), 1001);
setTimeout(()=>console.log(global.myCookie), 3001);


























