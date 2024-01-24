import { createCarton } from "@/bucket";
import { Box, Config, Getter, Setter } from "@/bucket/core/index.type";

type Init = {
  room: number;
  bar: number;
  cart: {
    select: number;
  };
};

type Action = {
  addRoom: () => void;
  removeRoom: () => void;
};

const box: Box<Init, Action> = {
  name: "hotel",
  initialState: {
    room: 0,
    bar: 0,
    cart: {
      select: 0,
    },
  },
  actions: (setter, getter) => {
    return {
      addRoom: () => {
        setter((state) => {
          state.cart.select += 1;
          return state;
        });
      },
      removeRoom: () => {
        setter((state) => {
          state.room -= 1;
          return state;
        });
      },
    };
  },
};

const config: Config = {
  name: "Test",
  persist: true,
  secure: false,
};
export const { useDispatcher, useSelector } = createCarton(box, config);
