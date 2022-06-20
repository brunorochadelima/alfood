import { Routes, Route } from 'react-router-dom';
import AdminRestaurantes from './paginas/Administracao/Restaurante/AdminRestaurantes';
import FormRestaurante from './paginas/Administracao/Restaurante/FormRestaurante';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin/restaurantes" element={<AdminRestaurantes />} />
      <Route path="/admin/restaurantes/novo" element={<FormRestaurante />} />
    </Routes>
  );
}

export default App;
