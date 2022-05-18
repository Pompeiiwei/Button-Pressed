import React from 'react';
import useCrud from './hooks/useCrud';

const AppContext = React.createContext({
  thePressButton: {},
});

function AppContextProvider({ children }) {
  const { data: thePressButton, update: updatePressButton } = useCrud(
    '/api/pressButtons',
    []
  );

  // The context value that will be supplied to any descendants of this component.
  const context = {
    thePressButton,
    updatePressButton,
  };

  // Wraps the given child components in a Provider for the above context.
  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}

export { AppContext, AppContextProvider };
