import React from 'react';
import { StrictMode } from 'react';  
import { createRoot } from 'react-dom/client'; 
import App from './App'; // Ensure the correct path is provided

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
