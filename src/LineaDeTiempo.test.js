import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LineaDeTiempo from './LineaDeTiempo';
import { EspeciesContext } from './EspeciesProvider';


const mockEspecies = [
  {
    id: 1,
    nombre: 'Dodo',
    periodo: 'Siglo XVII',
    habitat: 'Isla',
    causas: ['Caza'],
    imagen: 'dodo.jpg'
  },
  {
    id: 2,
    nombre: 'Mamut',
    periodo: 'Hace 4000 años',
    habitat: 'Tundra',
    causas: ['Cambio climático'],
    imagen: 'mamut.jpg'
  },
];

describe('LineaDeTiempo', () => {
  function renderLineaDeTiempoWithContext(data = mockEspecies, periodoInicial=null) {
    return render(
      <EspeciesContext.Provider value={{ data }}>
         <LineaDeTiempo initialPeriodoClicado={periodoInicial} />
      </EspeciesContext.Provider>
    );
  }

  test('renderiza el título y el selector', () => {
    renderLineaDeTiempoWithContext();
  
    expect(screen.getByText(/Línea de Tiempo de Extinciones/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Filtrar por período/i)).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /Todos/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /Siglo XVII/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /Hace 4000 años/i })).toBeInTheDocument();
  });
  
  test('filtra especies por período correctamente', async () => {
    renderLineaDeTiempoWithContext();
  
    fireEvent.change(screen.getByLabelText(/Filtrar por período/i), {
      target: { value: 'Siglo XVII' },
    });
  
    await waitFor(() => {
      expect(screen.getByText(/Siglo XVII/)).toBeInTheDocument();
    });
  });
  
  test('muestra especies al hacer clic en una barra del gráfico', async () => {
    renderLineaDeTiempoWithContext(undefined, 'Siglo XVII'); 
  
    await waitFor(() => {
      expect(screen.getByText(/Dodo/)).toBeInTheDocument();
    });
  });
  
  test('muestra mensaje si no hay especies disponibles', () => {
    renderLineaDeTiempoWithContext([]); 
  
    expect(screen.getByText(/No hay especies en ese período/i)).toBeInTheDocument();
  });
  
  
});
