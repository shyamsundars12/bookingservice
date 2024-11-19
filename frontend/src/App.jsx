import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './signup';
import Login from './login'
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
