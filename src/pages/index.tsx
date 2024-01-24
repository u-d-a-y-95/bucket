import { Inter } from "next/font/google";
import { useSelector, useDispatcher } from "@/example";
import { Card } from "@/example/card";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { addRoom, removeRoom } = useDispatcher();
  return (
    <main>
      <button className="border px-10 my-2 " onClick={() => addRoom()}>
        add
      </button>
      <button className="border px-10 my-2 mx-2" onClick={() => removeRoom()}>
        remove
      </button>
      <Card />
    </main>
  );
}
