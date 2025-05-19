import './App.css';
import ListaEspecies from './Especies';
import { EspeciesProvider } from './EspeciesProvider';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EspecieDetail from './EspeciesDetail';

function App() {
  return (
    <div className="App">
      <EspeciesProvider>
        <Router>
          <Routes>
            <Route path='/' element={<ListaEspecies/>} ></Route>
            <Route path='/especie/:id' element={<EspecieDetail/>} ></Route>
          </Routes>
        </Router>
      </EspeciesProvider>
    </div>
  );
}

export default App;
