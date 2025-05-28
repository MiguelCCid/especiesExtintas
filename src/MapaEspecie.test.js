import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MapaEspecies from './MapaEspecie';
import { EspeciesContext } from './EspeciesProvider';
import { MemoryRouter } from 'react-router-dom';

jest.mock('react-leaflet');


const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));


const mockEspecies = [
  {
    id: 1,
    nombre: 'Dodo',
    habitat: 'Isla Mauricio',
    causas: 'Caza',
    periodo: 'Siglo XVII',
    imagen: ''
  },
  {
    id: 2,
    nombre: 'Tigre de Tasmania',
    habitat: 'Tasmania',
    causas: 'Caza y enfermedades',
    periodo: 'Siglo XX',
    imagen: ''
  }
];

const renderMapaConContexto = () => {
  render(
    <EspeciesContext.Provider value={{ data: mockEspecies }}>
      <MemoryRouter>
        <MapaEspecies />
      </MemoryRouter>
    </EspeciesContext.Provider>
  );
};

describe('MapaEspecies', () => {
  test('renderiza el mapa', () => {
    renderMapaConContexto();

  });

  test('muestra marcadores para las especies con coordenadas conocidas', async () => {
    renderMapaConContexto();
    

    const dodoBtn = await screen.findByText(/Dodo/i);
    const tigreBtn = await screen.findByText(/Tigre de Tasmania/i);

    expect(dodoBtn).toBeInTheDocument();
    expect(tigreBtn).toBeInTheDocument();
  });

  test('navega al hacer clic en el nombre de una especie', async () => {
    renderMapaConContexto();

    const dodoBtn = await screen.findByText(/Dodo/i);
    fireEvent.click(dodoBtn);

    expect(mockedNavigate).toHaveBeenCalledWith('/especie/1');
  });

  test('ignora especies con hábitats sin coordenadas conocidas', () => {
    const especiesConHabitatDesconocido = [
      { id: 1, nombre: 'Especie Fantasma', habitat: 'LugarDesconocido' },
    ];
  
    render(
      <EspeciesContext.Provider value={{ data: especiesConHabitatDesconocido }}>
        <MemoryRouter>
          <MapaEspecies />
        </MemoryRouter>
      </EspeciesContext.Provider>
    );
  
    
    expect(screen.queryByText(/Especie Fantasma/i)).not.toBeInTheDocument();
  });
  
  
});
