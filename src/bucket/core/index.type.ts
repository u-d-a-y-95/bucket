export type Config = {
  name: string;
  persist: boolean;
  secure?: boolean;
};

export type Listner = () => void;

export type Getter<T> = () => T;

export type Setter<T> = (cb: (prevState: T) => T) => void;

export type Subscribe = (listener: Listner) => () => void;

export type UseStore = <T>(
  subscribe: Subscribe,
  getState: Getter<T>,
  setter: Setter<T>,
  config: Config,
  selector: (state: T) => T
) => T;

export type Box<T, K> = {
  name: string;
  initialState: T;
  actions: (setter: Setter<T>, getter: Getter<T>) => K;
};

export type SetupBoxState = <T, K>(
  box: Box<T, K>,
  config: Config
) => {
  subscribe: Subscribe;
  getter: Getter<T>;
  setter: Setter<T>;
};

export type UseSelector<T> = {
  <Selector extends (state: T) => unknown>(
    selector: Selector
  ): Selector extends (state: T) => infer R ? R : ReturnType<Selector>;
  (): T;
};

export type CreateCarton = <T, K>(
  box: Box<T, K>,
  config: Config
) => {
  useSelector: UseSelector<T>;
  useDispatcher: () => K;
};
