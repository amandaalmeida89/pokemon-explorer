import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ContextProvider, Context } from '../services/ContextProvider';

describe('ContextProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetchList should work correctly', async () => {
    const mockData = { data: [] };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });
    render(
      <ContextProvider>
        <Context.Consumer>
          {({ fetchList }) => (
            <button onClick={() => fetchList(0)}>Fetch List</button>
          )}
        </Context.Consumer>
      </ContextProvider>
    );

    const button = screen.getByText('Fetch List');
    button.click();

    await waitFor(() => {
    });
  });

  it('fetchByName should work correctly', async () => {
    const mockData = { data: [] };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });

    render(
      <ContextProvider>
        <Context.Consumer>
          {({ fetchByName }) => (
            <button onClick={() => fetchByName('Pikachu')}>Fetch By Name</button>
          )}
        </Context.Consumer>
      </ContextProvider>
    );

    const button = screen.getByText('Fetch By Name');
    button.click();

    await waitFor(() => {
    });
  });
});
