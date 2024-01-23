import Image from "next/image";
import { Inter } from "next/font/google";
import { useStore } from "@/example";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { bears } = useStore();
  return (
    <main>
      {bears}
      {/* <button onClick={() => increasePopulation(10)}>add</button> */}
    </main>
  );
}
