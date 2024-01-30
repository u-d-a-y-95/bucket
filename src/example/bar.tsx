import { useSelector } from ".";

export const Bar = () => {
  const { bar } = useSelector((state) => state.resturant);
  return (
    <div>
      <div>Bar: {bar}</div>
    </div>
  );
};
