import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import ListaEspecies from './Especies';
import { EspeciesContext } from './EspeciesProvider';

const mockData = [
  {
    id: 1,
    nombre: 'Dodo',
    periodo: 'XVII',
    habitat: 'Isla',
    causas: ['Caza'],
    imagen: 'dodo.jpg',
  },
  {
    id: 2,
    nombre: 'Mamut',
    periodo: 'Hace 4000 años',
    habitat: 'Siberia',
    causas: ['Cambio climático'],
    imagen: 'mamut.jpg',
  },
];

const mockEliminar = jest.fn();
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const renderComponent = (contextValue) =>
  render(
    <EspeciesContext.Provider value={contextValue}>
      <BrowserRouter>
        <ListaEspecies />
      </BrowserRouter>
    </EspeciesContext.Provider>
  );

describe('ListaEspecies', () => {
  beforeEach(() => {
    mockEliminar.mockClear();
    mockNavigate.mockClear();
  });

  

  test('filtra por hábitat', async () => {
    renderComponent({ data: mockData, loading: false, eliminarEspecie: mockEliminar });

    const selectHabitat = screen.getByLabelText(/filtrar por hábitat/i);
    await userEvent.selectOptions(selectHabitat, 'Siberia');

    expect(screen.getByText('Mamut')).toBeInTheDocument();
    expect(screen.queryByText('Dodo')).not.toBeInTheDocument();
  });

  test('busca por nombre o causa', async () => {
    renderComponent({ data: mockData, loading: false, eliminarEspecie: mockEliminar });

    const inputBusqueda = screen.getByPlaceholderText(/buscar/i);
    await userEvent.type(inputBusqueda, 'climático');

    expect(screen.getByText('Mamut')).toBeInTheDocument();
    expect(screen.queryByText('Dodo')).not.toBeInTheDocument();
  });

  test('muestra mensaje cuando no hay especies', () => {
    renderComponent({ data: [], loading: false, eliminarEspecie: mockEliminar });
    expect(screen.getByText(/no se encontraron especies/i)).toBeInTheDocument();
  });

  test('botón eliminar llama a eliminarEspecie', () => {
    renderComponent({ data: mockData, loading: false, eliminarEspecie: mockEliminar });

    const btnEliminar = screen.getAllByRole('button', { name: /eliminar especie/i })[0];
    fireEvent.click(btnEliminar);

    expect(mockEliminar).toHaveBeenCalledWith(1);
  });

  test('navega al detalle al hacer click en el título', () => {
    renderComponent({ data: mockData, loading: false, eliminarEspecie: mockEliminar });

    const tituloDodo = screen.getByText('Dodo');
    fireEvent.click(tituloDodo);

    expect(mockNavigate).toHaveBeenCalledWith('/especie/1');
  });

  test('navega a agregar especie', () => {
    renderComponent({ data: mockData, loading: false, eliminarEspecie: mockEliminar });

    const btnAgregar = screen.getByRole('button', { name: /agregar nueva especie/i });
    fireEvent.click(btnAgregar);

    expect(mockNavigate).toHaveBeenCalledWith('/agregar');
  });
});
