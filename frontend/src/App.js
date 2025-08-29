import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InventoryPanel from "./components/InventoryPanel";
import { Toaster } from "./components/ui/toaster";

const Home = () => {
  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), url('https://images.unsplash.com/photo-1609665969132-f46fb5bf63c6')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container mx-auto relative z-10">
        <header className="py-4 text-center border-b border-yellow-600 bg-black bg-opacity-50 backdrop-blur-sm">
          <h1 className="text-2xl lg:text-4xl font-bold text-yellow-400 tracking-wider drop-shadow-lg">
            RESIDENT INVENTORY
          </h1>
          <p className="text-gray-300 mt-1 text-sm lg:text-base px-4 drop-shadow">
            Arrastra objetos al grid • Doble-clic para rotar ↻
          </p>
        </header>
        <main>
          <InventoryPanel />
        </main>
      </div>
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;