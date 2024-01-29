import { Inter } from "next/font/google";
import { useSelector, useDispatcher } from "@/example";
import { Card } from "@/example/card";
import { Bar } from "@/example/Bar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const {
    hotel: { add, remove },
    resturant,
  } = useDispatcher();

  return (
    <main>
      <Card />
      <button className="border px-10 my-2 " onClick={() => add()}>
        add
      </button>
      <button className="border px-10 my-2 mx-2" onClick={() => remove()}>
        remove
      </button>
      <Bar />
      <button className="border px-10 my-2 " onClick={() => resturant.add()}>
        add
      </button>
      <button
        className="border px-10 my-2 mx-2"
        onClick={() => resturant.remove()}
      >
        remove
      </button>
    </main>
  );
}
