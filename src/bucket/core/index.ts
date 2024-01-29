import { push } from "./storage";
import { useStore } from "./store";

const setupBoxState = (boxes, config) => {
  const listeners = new Set();
  let state = {};
  boxes.forEach((box) => {
    state[box.name] = box.initialState;
  });
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const setter = (key, cb) => {
    console.log(key, cb);
    state = Object.assign({}, state, { [key]: cb(state[key]) });
    if (config.persist) {
      push(config, state);
    }
    console.log(state);
    listeners.forEach((listener) => listener());
  };

  const getter = () => state;
  const actions = {};
  boxes.forEach((box) => {
    actions[box.name] = box.actions(setter.bind(null, box.name), getter);
  });
  return { subscribe, getter, setter, actions };
};

// @ts-ignore
export const createCarton = (boxes, config) => {
  const { subscribe, getter, setter, actions } = setupBoxState(boxes, config);
  // @ts-ignore
  const useSelector = (selector) =>
    useStore(subscribe, getter, setter, config, selector);
  const useDispatcher = () => actions;
  return { useDispatcher, useSelector };
};
