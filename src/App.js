import './App.css';
import ListaEspecies from './Especies';
import { EspeciesProvider } from './EspeciesProvider';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EspecieDetail from './EspeciesDetail';
import AgregarEspecie from "./AgregarEspecie";
import MapaEspecies from './MapaEspecie';





function App() {
  return (
    <div className="App">
      <EspeciesProvider>
        <Router>
          <Routes>
            <Route path='/agregar' element={<AgregarEspecie />} />
            <Route path='/' element={<ListaEspecies/>} ></Route>
            <Route path='/especie/:id' element={<EspecieDetail/>} ></Route>
            <Route path="/mapa" element={<MapaEspecies />} />
          </Routes>
        </Router>
      </EspeciesProvider>
    </div>
  );
}

export default App;
