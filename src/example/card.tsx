import { useSelector } from ".";

const Dummy = () => {
  return <div>Dummy</div>;
};

export const Card = () => {
  const {
    hotel: { room },
  } = useSelector();
  return (
    <div>
      new card
      <div>Room: {room}</div>
      <Dummy />
    </div>
  );
};
