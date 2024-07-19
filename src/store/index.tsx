import { createContext, ReactNode, useContext, useReducer } from 'react';
import { State } from '../types/store.types';
import reducer, { initialState } from './reducer';
import { actionsFactory } from './actions';

const StoreContext = createContext<(State & { dispatch: ReturnType<typeof actionsFactory> }) | null>(null);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = {
    ...state,
    dispatch: actionsFactory(dispatch),
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
