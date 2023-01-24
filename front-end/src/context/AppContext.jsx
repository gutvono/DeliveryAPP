import { createContext, useEffect, useState } from 'react';

export const AppContext = createContext();

// eslint-disable-next-line react/prop-types
export function AppProvider({ children }) {
  return (
    <AppContext.Provider value={ { } }>
      {children}
    </AppContext.Provider>
  );
}
