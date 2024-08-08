// Type for the setState function
type SetState<T> = (newValue: T | ((prevState: T) => T)) => void;

// Type for the useState hook
declare function useState<T>(
  initialValue: T | (() => T),
): [() => T, SetState<T>];

// Type for the getStore function
type GetStore<T> = () => T;

// Type for the setStore function
type SetStore<T> = (newValue: T | ((prevState: T) => T)) => void;

// Type for the useStore hook
declare function useStore<T>(
  key: string,
  initialValue: T | (() => T),
): [GetStore<T>, SetStore<T>];

// Type for render functions
type RenderFunction = () => string;

// Type for the renderAll function
declare function renderAll(): void;

// Type for the reactify function
declare function reactify(renderFunction?: RenderFunction): void;
