import { Routes, Route } from "react-router-dom";
import AdminRestaurantes from "./paginas/Administracao/Restaurante/AdminRestaurantes";
import FormRestaurante from "./paginas/Administracao/Restaurante/FormRestaurante";
import HeaderAdmin from "./paginas/Administracao/Restaurante/HeaderAdmin";
import Home from "./paginas/Home";
import VitrineRestaurantes from "./paginas/VitrineRestaurantes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin" element= {<HeaderAdmin/>}>
        <Route path="restaurantes" element={<AdminRestaurantes />} />
        <Route path="restaurantes/novo" element={<FormRestaurante />} />
        <Route path="restaurantes/:id" element={<FormRestaurante />} />
      </Route>
    </Routes>
  );
}

export default App;
