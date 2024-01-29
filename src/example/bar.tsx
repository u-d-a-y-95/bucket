import { useSelector } from ".";

export const Bar = () => {
  const {
    resturant: { bar },
  } = useSelector();
  return (
    <div>
      <div>Bar: {bar}</div>
    </div>
  );
};
