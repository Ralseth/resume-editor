export type DndListener = (...args: unknown[]) => void;
export type DndListeners = Record<string, DndListener>;