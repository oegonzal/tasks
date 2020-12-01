import React, { useReducer } from 'react';
import './App.css';
import { Router } from 'navigation';
import { AppReducer, AppContext } from "AppContext";
import { ThemeProvider } from 'styled-components';
import { theme } from 'themes';


function App() {
  const [state, dispatch] = useReducer(AppReducer, { tasks: [] });

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={{ state, dispatch }}>
        <Router />
      </AppContext.Provider>
    </ThemeProvider>
  )
}


export default App;
