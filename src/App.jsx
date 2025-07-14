import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistroCliente from "./lib/RegistroCliente";
import Envio from "./lib/Envio";
import Panel from "./lib/panel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistroCliente />} />
        <Route path="/envio" element={<Envio />} />
        <Route path="/panel" element={<Panel />} />
      </Routes>
    </Router>
  );
}

export default App;