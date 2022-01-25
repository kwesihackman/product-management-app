import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ProductListings } from './components/MainApp';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ProductListings />} />
      </Routes>
    </div>
  );
}

export default App;
