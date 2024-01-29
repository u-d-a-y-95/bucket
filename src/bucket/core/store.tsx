import { use, useEffect, useSyncExternalStore } from "react";
import { pull, push } from "./storage";

export const useStore = (subscribe, getter, setter, config, selector) => {
  // useEffect(() => {
  //   if (config.persist) {
  //     setter(() => pull<T>(config, getter()));
  //   }
  // }, []);
  const slice = useSyncExternalStore(subscribe, getter, getter);
  return selector ? selector(slice) : slice;
};
