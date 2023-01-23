import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RoutesApp from './Routes';

function App() {
  return (
    <BrowserRouter className="App">
      <RoutesApp />
    </BrowserRouter>
  );
}

export default App;
