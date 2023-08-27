import { useContext, createContext, useReducer } from 'react';
import { initialState } from './initialState';
import { reducer } from './reducer';

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
