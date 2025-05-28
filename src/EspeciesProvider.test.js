import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { EspeciesProvider, EspeciesContext } from './EspeciesProvider';

// Mock global fetch
global.fetch = jest.fn();

const mockEspecies = [
  { id: 1, nombre: 'Dodo' },
  { id: 2, nombre: 'Mamut' },
];

describe('EspeciesProvider', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('carga datos y cambia loading a false', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => mockEspecies,
    });

    let contextValue;
    render(
      <EspeciesProvider>
        <EspeciesContext.Consumer>
          {value => {
            contextValue = value;
            return null;
          }}
        </EspeciesContext.Consumer>
      </EspeciesProvider>
    );

    expect(contextValue.loading).toBe(true);

    await waitFor(() => {
      expect(contextValue.loading).toBe(false);
      expect(contextValue.data).toEqual(mockEspecies);
    });
  });

  test('eliminarEspecie elimina la especie del estado', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => mockEspecies,
    });

    let contextValue;
    render(
      <EspeciesProvider>
        <EspeciesContext.Consumer>
          {value => {
            contextValue = value;
            return null;
          }}
        </EspeciesContext.Consumer>
      </EspeciesProvider>
    );

    await waitFor(() => expect(contextValue.loading).toBe(false));

    contextValue.eliminarEspecie(1);

    await waitFor(() => {
      expect(contextValue.data.find(e => e.id === 1)).toBeUndefined();
      expect(contextValue.data.length).toBe(1);
    });
  });
  
  test('agregarEspecie agrega una nueva especie con id', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => mockEspecies,
    });

    let contextValue;
    render(
      <EspeciesProvider>
        <EspeciesContext.Consumer>
          {value => {
            contextValue = value;
            return null;
          }}
        </EspeciesContext.Consumer>
      </EspeciesProvider>
    );

    await waitFor(() => expect(contextValue.loading).toBe(false));

    const nuevaEspecie = { nombre: 'Tigre', periodo: 'Holoceno' };

    contextValue.agregarEspecie(nuevaEspecie);

    await waitFor(() => {
      expect(contextValue.data.some(e => e.nombre === 'Tigre')).toBe(true);
      expect(contextValue.data.find(e => e.nombre === 'Tigre').id).toBeDefined();
    });
  });
});

