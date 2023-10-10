import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { StateProvider } from './context/StateProvider';

import './index.css';
import { initialState } from './context/initialState';
import { reducer } from './context/reducer';
import { UserProvider } from './context/UserContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <StateProvider initialState={initialState} reducer={reducer}>
          <App />
        </StateProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
