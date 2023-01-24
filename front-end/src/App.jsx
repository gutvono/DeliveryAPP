import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RoutesApp from './Routes';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <BrowserRouter className="App">
        <RoutesApp />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
