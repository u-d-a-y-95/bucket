import { useSelector } from ".";

export const Card = () => {
  const { select } = useSelector((state) => state.cart);
  return (
    <div>
      new card
      <div>Room: {select}</div>
    </div>
  );
};
