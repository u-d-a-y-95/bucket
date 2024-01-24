import {
  Box,
  CreateCarton,
  CreateStore,
  GetState,
  Listner,
  Setter,
  Subscribe,
} from "./index.type";
import { useStore } from "./state";
import { push } from "./storage";

const createStore: CreateStore = (config, createState) => {
  const listeners: Set<Listner> = new Set();
  let box: Box;

  const setter: Setter = (cb) => {
    box = Object.assign({}, box, cb(box));
    if (config.persist) {
      push(config, box);
    }
    listeners.forEach((listener) => listener());
  };

  const getState: GetState = () => box;

  const subscribe: Subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  box = createState(setter, getState);

  return { subscribe, getState, setter, box };
};

export const createCarton: CreateCarton = (config, createState) => {
  const { subscribe, getState, setter, box } = createStore(config, createState);
  console.log(box);
  const useSelector = (selector = (state) => state) =>
    useStore(subscribe, getState, setter, config, selector);

  return useSelector;
};
