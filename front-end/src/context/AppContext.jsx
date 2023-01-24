import { createContext } from 'react';
import { node } from 'prop-types';

export const AppContext = createContext();

// eslint-disable-next-line react/prop-types
export function AppProvider({ children }) {
  return (
    <AppContext.Provider value={ {  } }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: node,
}.isRequired;
