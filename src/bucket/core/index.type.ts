export type Config = {
  name: string;
  persist: boolean;
  secure?: boolean;
};

export type Listner = () => void;
export type Box = unknown;

export type GetState<T> = () => T;
type CB<T> = (box: T) => T;

export type Setter<T> = (cb: CB<T>) => void;

export type Subscribe = (listener: Listner) => () => void;

type CreateStoreRes<T> = {
  subscribe: Subscribe;
  getState: GetState<T>;
  setter: Setter<T>;
};

export type CreateState<T> = (
  setter: Setter<T>,
  getter: GetState<T>
) => unknown;

export type CreateStore = <T>(
  config: Config,
  createState: CreateState<T>
) => CreateStoreRes<T>;

export type CreateCarton = <T>(
  config: Config,
  createState: CreateState<T>
) => T;

export type UseStore<T> = (
  subscribe: Subscribe,
  getState: GetState<T>,
  setter: Setter<T>,
  config: Config,
  selector: (state: T) => T
) => T;
