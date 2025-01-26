import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import './index.css';
import ExerciseContextProvider from './library/store/context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ExerciseContextProvider>
        <App />
      </ExerciseContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
