import {
  Box,
  CreateCarton,
  SetupBoxState,
  Listner,
  Setter,
  Subscribe,
  Config,
} from "./index.type";
import { push } from "./storage";
import { useStore } from "./store";

const setupBoxState: SetupBoxState = <T, K>(box: Box<T, K>, config: Config) => {
  const listeners: Set<Listner> = new Set();
  let state = box.initialState;

  const subscribe: Subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const setter: Setter<T> = (cb) => {
    state = Object.assign({}, state, cb(state));

    if (config.persist) {
      push(config, state);
    }

    listeners.forEach((listener) => listener());
  };

  const getter = () => state;
  return { subscribe, getter, setter };
};

// @ts-ignore
export const createCarton: CreateCarton = <T, K>(
  box: Box<T, K>,
  config: Config
) => {
  const { subscribe, getter, setter } = setupBoxState(box, config);
  // @ts-ignore
  const useSelector = (selector) =>
    useStore(subscribe, getter, setter, config, selector);
  const useDispatcher = () => box.actions(setter, getter);

  return { useSelector, useDispatcher };
};
