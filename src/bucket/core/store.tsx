import { use, useEffect, useSyncExternalStore } from "react";
import { pull, push } from "./storage";
import { Config, Getter, Setter, Subscribe, UseStore } from "./index.type";

export const useStore: UseStore = <T, Selector extends (state: T) => any>(
  subscribe: Subscribe,
  getter: Getter<T>,
  setter: Setter<T>,
  config: Config,
  selector: Selector
) => {
  useEffect(() => {
    if (config.persist) {
      setter(() => pull<T>(config, getter()));
    }
  }, []);
  const slice = useSyncExternalStore(subscribe, getter, getter);
  return selector ? selector(slice) : slice;
};
