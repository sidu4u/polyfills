//pollyfill for useMemo

//1st approach
const useMemoPollyfillGenerator = () => {
    let memoizedDependencies;
    let memoizedValue;

    return (callback, dependencies) => {

        if (dependencies.toString() !== memoizedDependencies.toString()) {
            memoizedValue = callback();
        }

        if (memoizedDependencies === undefined) {
            memoizedDependencies = dependencies;
        }

        return memoizedValue;
    }


}

const useMemo = useMemoPollyfillGenerator();

//2nd approach
const useMemoPollyfillGenerator = (callback, dependencies) => {
    let memoizedDependencies = useRef(dependencies);
    let memoizedValue = useRef(callback());



    if (dependencies.toString() !== memoizedDependencies.current.toString()) {
        memoizedDependencies.current = dependencies;
        memoizedValue.current = callback();
    }

    return memoizedValue.current;

}