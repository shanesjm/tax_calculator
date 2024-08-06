import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Mock, vi } from 'vitest';
import '@testing-library/jest-dom';
import { ReactNode } from 'react';

import TaxCalculator from './TaxCalculator';
import taxCalculateReducer from '../../slices/TaxCalculateSlice';
import { useFetchTaxBracketsQuery } from '../../apis/TaxCalculateAPI';

// Mock the Tax API hook
vi.mock('../../apis/TaxCalculateAPI', () => ({
  useFetchTaxBracketsQuery: vi.fn(),
}));

// Helper function to render the component with Redux
const renderWithRedux = (component: ReactNode) => {
  const store = configureStore({
    reducer: {
      taxCalculate: taxCalculateReducer,
    },
  });
  return render(<Provider store={store}>{component}</Provider>);
};

describe('Tax Calculator Test suite', () => {
  it('Check if Skeleton is Visible while fetching Data', () => {
    const mockApiResponse = {
      tax_brackets: [{ max: 20000, rate: 0.1 }],
    };

    (useFetchTaxBracketsQuery as Mock).mockReturnValue({
      data: mockApiResponse,
      isFetching: true,
      isError: false,
      refetch: vi.fn(),
    });

    renderWithRedux(<TaxCalculator />);
    expect(screen.getByTestId('skeleton')).toBeVisible();
  });

  it('Check if Error View is Visible when API call fails', () => {
    const mockApiResponse = {
      tax_brackets: [{ max: 20000, rate: 0.1 }],
    };

    (useFetchTaxBracketsQuery as Mock).mockReturnValue({
      data: mockApiResponse,
      isFetching: true,
      isError: true,
      error: {
        data: {
          errors: [
            {
              code: 'INTERNAL_SERVER_ERROR',
              field: '',
              message: 'Database not found!',
            },
          ],
        },
      },
      refetch: vi.fn(),
    });

    renderWithRedux(<TaxCalculator />);
    expect(screen.getByText(/Something went wrong/i)).toBeVisible();
  });

  it('Check if TaxCalculator renders the TaxSummary,TaxBracket and TaxGraph  on successful API call ', async () => {
    const mockApiResponse = {
      tax_brackets: [
        { max: 20000, rate: 0.1 },
        { max: 50000, rate: 0.2 },
        { max: null, rate: 0.3 },
      ],
    };

    (useFetchTaxBracketsQuery as Mock).mockReturnValue({
      data: mockApiResponse,
      isFetching: false,
      isError: false,
      refetch: vi.fn(),
    });
    renderWithRedux(<TaxCalculator />);
    await waitFor(() => {
      // check if Tax summary (any one param) section is visible
      expect(screen.getByText(/salary/i)).toBeVisible();
      // check if Tax Bracket ((any one param) section is visible
      expect(screen.getByText(/tax bracket/i)).toBeVisible();
      // check if Tax Graph section is visible
      expect(screen.getByTestId('tax_graph')).toBeVisible();
    });
  });

  it('Check if Values get Updated on Clicking Calculate Button', async () => {
    const mockApiResponse = {
      tax_brackets: [
        {
          min: 0,
          max: 50197,
          rate: 0.15,
        },
        {
          min: 50197,
          max: 100392,
          rate: 0.205,
        },
        {
          min: 100392,
          max: 155625,
          rate: 0.26,
        },
        {
          min: 155625,
          max: 221708,
          rate: 0.29,
        },
        {
          min: 221708,
          rate: 0.33,
        },
      ],
    };

    (useFetchTaxBracketsQuery as Mock).mockReturnValue({
      data: mockApiResponse,
      isFetching: false,
      isError: false,
      refetch: vi.fn(),
    });

    renderWithRedux(<TaxCalculator />);

    await waitFor(() => {
      const incomeInputField = screen.getByRole('spinbutton', {
        name: /annual income/i,
      });
      const calculateButton = screen.getByRole('button', {
        name: /calculate/i,
      });

      fireEvent.change(incomeInputField, { target: { value: 100000 } });
      fireEvent.click(calculateButton);
      const totalTax = screen.getByTestId('total_tax');

      expect(totalTax.textContent).toBe('$17,739.17');
      expect(screen.getByText(/salary/i)).toBeVisible();
      expect(screen.getByTestId('tax_graph')).toBeVisible();
    });
  });
});
