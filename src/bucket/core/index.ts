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

const setupBoxState: SetupBoxState = <T, K>(
  boxes: Box<T, K>[],
  config: Config
) => {
  const listeners: Set<Listner> = new Set();
  let state: object = {};
  boxes.forEach((box) => {
    state[box.name] = box.initialState;
  });
  const subscribe: Subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const setter: Setter<T> = (key, cb) => {
    console.log(key, cb);
    state = Object.assign({}, state, { [key]: cb(state[key]) });
    if (config.persist) {
      push(config, state);
    }
    console.log(state);
    listeners.forEach((listener) => listener());
  };

  const getter = () => state;
  const actions: object = {};
  boxes.forEach((box) => {
    actions[box.name] = box.actions(setter.bind(null, box.name), getter);
  });
  return { subscribe, getter, setter, actions };
};

// @ts-ignore
export const createCarton: CreateCarton = <T, K>(
  boxes: Box<T, K>[],
  config: Config
) => {
  const { subscribe, getter, setter, actions } = setupBoxState(boxes, config);
  // @ts-ignore
  const useSelector = (selector) =>
    useStore(subscribe, getter, setter, config, selector);
  const useDispatcher = () => actions;
  return { useDispatcher, useSelector };
};
