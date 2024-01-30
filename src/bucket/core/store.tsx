import { use, useEffect, useSyncExternalStore } from "react";
import { pull, push } from "./storage";

const getSnapShot = (getter, selector) => {
  let prevState;
  return () => {
    const state = selector(getter());
    if (!prevState || !Object.is(prevState, state)) {
      prevState = state;
    }
    return prevState;
  };
};

export const useStore = (subscribe, getter, setter, config, selector) => {
  // useEffect(() => {
  //   if (config.persist) {
  //     setter(() => pull<T>(config, getter()));
  //   }
  // }, []);
  const store = useSyncExternalStore(
    subscribe,
    getSnapShot(getter, selector),
    getSnapShot(getter, selector)
  );
  return store;
};
