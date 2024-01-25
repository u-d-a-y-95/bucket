import { useSelector } from ".";

export const Card = () => {
  const { room } = useSelector((state) => state);
  return (
    <div>
      new card
      <div>Room: {room}</div>
    </div>
  );
};
