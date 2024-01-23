import { createCloud } from "@/bucket";

export const useStore = createCloud((set) => ({
  bears: 0,
  increasePopulation: (add) => set((state) => ({ bears: state.bears + add })),
  removeAllBears: () => set({ bears: 0 }),
}));

console.log(useStore);
