import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AgregarEspecie from './AgregarEspecie';
import { EspeciesContext } from './EspeciesProvider';
import { MemoryRouter } from 'react-router-dom';


const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('AgregarEspecie', () => {
  const mockAgregarEspecie = jest.fn();

  const renderWithContext = () => {
    render(
      <EspeciesContext.Provider value={{ agregarEspecie: mockAgregarEspecie }}>
        <MemoryRouter>
          <AgregarEspecie />
        </MemoryRouter>
      </EspeciesContext.Provider>
    );
  };

  beforeEach(() => {
    mockAgregarEspecie.mockClear();
    mockedNavigate.mockClear();
  });

  test('renderiza el formulario con todos los campos', () => {
    renderWithContext();

    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Periodo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Hábitat/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Causas/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Imagen/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Agregar Especie/i })).toBeInTheDocument();
  });

  test('permite escribir en los inputs', () => {
    renderWithContext();

    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Tigre dientes de sable' } });
    fireEvent.change(screen.getByLabelText(/Periodo/i), { target: { value: 'Pleistoceno' } });
    fireEvent.change(screen.getByLabelText(/Hábitat/i), { target: { value: 'América del Norte' } });
    fireEvent.change(screen.getByLabelText(/Causas/i), { target: { value: 'Cambio climático' } });
    fireEvent.change(screen.getByLabelText(/Imagen/i), { target: { value: 'tigre.jpg' } });

    expect(screen.getByLabelText(/Nombre/i)).toHaveValue('Tigre dientes de sable');
  });

  test('envía el formulario y llama a agregarEspecie', () => {
    renderWithContext();

    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Dodo' } });
    fireEvent.change(screen.getByLabelText(/Periodo/i), { target: { value: 'Siglo XVII' } });
    fireEvent.change(screen.getByLabelText(/Hábitat/i), { target: { value: 'Isla Mauricio' } });
    fireEvent.change(screen.getByLabelText(/Causas/i), { target: { value: 'Caza, Especies invasoras' } });
    fireEvent.change(screen.getByLabelText(/Imagen/i), { target: { value: 'dodo.jpg' } });

    fireEvent.click(screen.getByRole('button', { name: /Agregar Especie/i }));

    expect(mockAgregarEspecie).toHaveBeenCalledWith({
      nombre: 'Dodo',
      periodo: 'Siglo XVII',
      habitat: 'Isla Mauricio',
      causas: 'Caza, Especies invasoras',
      imagen: 'dodo.jpg'
    });

    expect(mockedNavigate).toHaveBeenCalledWith('/');
  });
});
