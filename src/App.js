import React from "react";
import { Routes, Route } from "react-router-dom";
import PaginaPrincipal from "./front-end/paginaPrincipal/principal";
import Sensores from "./front-end/paginaSensores/sensores";
import Placas from "./front-end/paginaPlacas/placas";
import Maquinas from "./front-end/paginaMaquinas/maquinas";
import Areas from "./front-end/paginaAreas/areas";
import ScrollToTop from "./front-end/Scroll/ScrollToTop";

function App() {
  return (

     <>
      <ScrollToTop />
    <Routes>
      <Route path="/" element={<PaginaPrincipal />} />
      <Route path="/sensores" element={<Sensores />} />
      <Route path="/placas" element={<Placas />} />
      <Route path="/maquinas" element={<Maquinas />} />
      <Route path="/areas" element={<Areas />} />
    </Routes>

    </>
  );
}

export default App;