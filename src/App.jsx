import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistroCliente from "./lib/RegistroCliente"; // ✅ ahora sí en lib
import Envio from "./lib/Envio"; // también en lib

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistroCliente />} />
        <Route path="/envio" element={<Envio />} />
      </Routes>
    </Router>
  );
}

export default App;
