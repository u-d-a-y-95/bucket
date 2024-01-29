import { createCarton } from "@/bucket";
import { Box, Config, Getter, Setter } from "@/bucket/core/index.type";

type Init = {
  room: number;
};
type Init2 = {
  bar: number;
};

type Action = {
  add: () => void;
  remove: () => void;
};

const box1: Box<Init, Action> = {
  name: "hotel",
  initialState: {
    room: 0,
  },
  actions: (setter, getter) => {
    return {
      add: () => {
        setter((state) => {
          state.room += 1;
          return state;
        });
      },
      remove: () => {
        setter((state) => {
          state.room -= 1;
          return state;
        });
      },
    };
  },
};
const box2: Box<Init2, Action> = {
  name: "resturant",
  initialState: {
    bar: 0,
  },
  actions: (setter, getter) => {
    return {
      add: () => {
        setter((state) => {
          state.bar += 1;
          return state;
        });
      },
      remove: () => {
        setter((state) => {
          state.bar -= 1;
          return state;
        });
      },
    };
  },
};

const config: Config = {
  name: "Test",
  persist: false,
  secure: false,
};
export const { useDispatcher, useSelector } = createCarton(
  [box1, box2],
  config
);
