import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from '../utils/LocalStorage';
import { reducer } from './reducer';
const persistedStoreData = loadFromLocalStorage();
export const store = createStore(
  reducer,
  persistedStoreData,
  composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(() => saveToLocalStorage(store.getState()));
