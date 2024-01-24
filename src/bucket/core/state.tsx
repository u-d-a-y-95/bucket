import { useEffect, useSyncExternalStore } from "react";
import { pull } from "./storage";
import { UseStore } from "./index.type";

export const useStore: UseStore = (
  subscribe,
  getState,
  setState,
  config,
  selector
) => {
  useEffect(() => {
    if (config.persist) {
      setState(() => pull(config, getState()));
    }
  }, []);
  console.log("test", getState());
  const slice = useSyncExternalStore(subscribe, getState, getState);
  return selector(slice);
};
