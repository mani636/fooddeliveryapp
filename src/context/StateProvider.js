import { useContext, createContext, useReducer } from 'react';

import { reducer } from './reducer';
import { initialState } from './initialState';

export const StateContext = createContext();

export const StateProvider = ({ children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
