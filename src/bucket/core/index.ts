import { useSyncExternalStore } from "react";

const createStore = (createState) => {
  const listeners = new Set();
  let state;

  const setState = (cb) => {
    state = Object.assign({}, state, cb(state));
    listeners.forEach((listener) => listener());
  };

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  state = createState(setState, getState);
  const getInitialState = () => state;
  return { subscribe, getState, getInitialState };
};

export function useStore(subscribe, getState, getInitialState) {
  const slice = useSyncExternalStore(subscribe, getState, getInitialState);
  return slice;
}

export const createCloud = (config) => {
  const { subscribe, getState, getInitialState } = createStore(config);
  const useBoundStore = () => useStore(subscribe, getState, getInitialState);
  return useBoundStore;
};
