import React from 'react';
import { render, screen } from '@testing-library/react';
import EspecieDetail from './EspeciesDetail';
import { EspeciesContext } from './EspeciesProvider';

jest.mock('react-router-dom', () => ({
  useParams: () => ({ id: '1' }),
}));

const mockData = [
  {
    id: 1,
    nombre: 'Dodo',
    periodo: 'XVII',
    habitat: 'Isla',
    tipo_animal: 'Ave',
    causas: ['Caza', 'Pérdida de hábitat'],
    imagen: 'dodo.jpg',
  },
  {
    id: 2,
    nombre: 'Mamut',
    periodo: 'Hace 4000 años',
    habitat: 'Siberia',
    tipo_animal: 'Mamífero',
    causas: ['Cambio climático'],
    imagen: 'mamut.jpg',
  },
];

const renderComponent = (contextValue) =>
  render(
    <EspeciesContext.Provider value={contextValue}>
      <EspecieDetail />
    </EspeciesContext.Provider>
  );

describe('EspecieDetail', () => {
  test('muestra loading mientras carga', () => {
    renderComponent({ data: [], loading: true });
    expect(screen.getByText(/cargando especie/i)).toBeInTheDocument();
  });

  test('muestra detalle de la especie cuando se encuentra', () => {
    renderComponent({ data: mockData, loading: false });

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Dodo');
    expect(screen.getByText(/Período:/i).textContent).toContain('XVII');
    expect(screen.getByText(/Hábitat:/i).textContent).toContain('Isla');
    expect(screen.getByText(/Tipo:/i).textContent).toContain('Ave');
    expect(screen.getByText(/Causas de extinción:/i).textContent).toContain('Caza, Pérdida de hábitat');
    expect(screen.getByRole('img')).toHaveAttribute('src', '/imagenes/dodo.jpg');
  });

  test('muestra mensaje si la especie no se encuentra', () => {
    renderComponent({ data: [], loading: false });
    expect(screen.getByText(/especie no encontrada/i)).toBeInTheDocument();
  });
  

});
