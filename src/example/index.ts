import { createCarton } from "@/bucket";

const createState = (set) => ({
  bears: 0,
  increasePopulation: (add) => set((state) => ({ bears: state.bears + add })),
  removeAllBears: () => set({ bears: 0 }),
});
type State = {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
};
export const useStore = createCarton<State>(
  { name: "Test", persist: true, secure: false },
  createState
);
