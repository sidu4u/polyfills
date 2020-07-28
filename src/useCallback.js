const useCallbackPolyfill = (callback, dependencies) => {
    memoziedCallback = useRef(callback);
    memoziedDependencies = useRef(dependencies);

    if (dependencies.toString() !== memoziedDependencies.current.toString()) {
        memoziedCallback.current = callback;
        memoziedDependencies.current = dependencies;
    }

    return memoziedCallback.current;

}