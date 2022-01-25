import { IAppState } from './Types';
import { ERROR_SAVING_STATE, STORAGE_KEY } from './Constants';

export const saveToLocalStorage = (state: IAppState): string | void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (error) {
    return ERROR_SAVING_STATE;
  }
};

export const loadFromLocalStorage = (): IAppState | undefined => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};
