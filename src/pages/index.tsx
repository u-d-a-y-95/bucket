import { Inter } from "next/font/google";
import { useStore } from "@/example";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { bears, increasePopulation } = useStore((state) => state.);
  return (
    <main>
      {bears}
      <button onClick={() => increasePopulation(10)}>add</button>
    </main>
  );
}
