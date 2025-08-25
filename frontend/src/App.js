import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InventoryPanel from "./components/InventoryPanel";
import { Toaster } from "./components/ui/toaster";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto">
        <header className="py-4 text-center border-b border-yellow-600">
          <h1 className="text-2xl lg:text-4xl font-bold text-yellow-400 tracking-wider">
            PUZZLE INVENTORY
          </h1>
          <p className="text-gray-400 mt-1 text-sm lg:text-base px-4">
            Organiza los objetos en el grid - ¡Optimizado para móvil!
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