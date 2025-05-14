import logo from './logo.svg';
import './App.css';
import ListaEspecies from './Especies';
import { EspeciesProvider } from './EspeciesProvider';
function App() {
  return (
    <div className="App">
      <EspeciesProvider>
      <ListaEspecies/>
      </EspeciesProvider>
    </div>
  );
}

export default App;
