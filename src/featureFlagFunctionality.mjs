// in this question we need to implement a functionality that can be used to show different features to different customers. It is commonly known as A?B testing. We need to build a common utility on frontend that can be used by the entire web app to get the status of the feature flag. Assume that the BE is pre build and a function is provided for it.
// Functional Requirements
// getFeatureState should return the provided feature flag
// in case the flag is missing or an error return the default value
// getFeatureState should support caching with ttl to minimize calls to backend

const FLAGS = {
  a: "flagA",
  b: "flagB",
  c: "flagC",
  d: "flagD",
  e: "flagE",
  f: "flagF",
  g: "flagG",
  h: "flagH",
  i: "flagI",
  j: "flagJ",
  k: "flagK",
  l: "flagL",
  m: "flagM",
  n: "flagN",
  o: "flagO",
  p: "flagP",
  q: "flagQ",
  r: "flagR",
  s: "flagS",
  t: "flagT",
  u: "flagU",
  v: "flagV",
  w: "flagW",
  x: "flagX",
  y: "flagY",
  z: "flagZ",
};

function cachify(func, ttl) {
  const cache = new Map();

  return async (...inputs) => {
    const key = JSON.stringify(inputs);
    const entry = cache.get(key);
    const epoc = Date.now();
    if (entry && epoc - entry.ttl < ttl) {
      return entry.val;
    }

    const val = await func(...inputs);
    cache.set(key, { val, ttl: Date.now() });
    return val;
  };
}

function fetchFlagsData() {
  console.log("getting data from backend");
  return new Promise((resolve) => {
    setTimeout(resolve(FLAGS), 50);
  });
}

async function getFeatureState(feature, fallback) {
  try {
    const allData = await fetchFlagsData();
    if (allData[feature] !== undefined) {
      return allData[feature];
    }
    throw new Error("invalid data");
  } catch (e) {
    return fallback;
  }
}

const cachedGetFeatureState = cachify(getFeatureState, 350);

const data = await cachedGetFeatureState('a', 'fallback');

setTimeout(async ()=>{
  const data = await cachedGetFeatureState('a', 'fallback');
  console.log('this is data after 250',data);
}, 250);


setTimeout(async ()=>{
  const data = await cachedGetFeatureState('a', 'fallback');
  console.log('this is data after 400',data);
}, 400);

console.log('this is data',data);